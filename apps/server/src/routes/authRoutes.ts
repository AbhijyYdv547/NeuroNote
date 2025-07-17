import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, SigninSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect Inputs"
    })
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data?.email,
        password: hashedPassword,
        name: parsedData.data.name
      }
    })
    res.json({
      userId: user.id
    })
  } catch (e) {
    res.status(411).json({
      message: "User already exists with this username"
    })
  }
})

router.post("/login", async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect Inputs"
    })
    return;
  }

  try {

    const user = await prismaClient.user.findFirst({
      where: {
        email: parsedData.data.email
      }
    })

    if (!user) {
      res.status(403).json({
        message: "Not authorized"
      })
      return;
    }

    const passwordMatch = await bcrypt.compare(parsedData.data.password, user.password);
    if (!passwordMatch) {
      res.status(403).json({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign({
      userId: user?.id
    }, JWT_SECRET)

    res.json({
      token
    })
  } catch (e) {

    res.status(500).json({ message: "Internal server error" });
  }

})

export default router;