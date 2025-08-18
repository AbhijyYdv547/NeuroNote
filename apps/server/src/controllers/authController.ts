import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, SigninSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import bcryptjs from "bcryptjs"
import { Request,Response } from "express";
import jwt from "jsonwebtoken"

export const signupController =  async (req:Request, res:Response) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect Inputs"
    })
    return;
  }

  try {
    console.log("Body:", req.body);
    const hashedPassword = await bcryptjs.hash(parsedData.data.password, 10);
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data?.email,
        password: hashedPassword,
        name: parsedData.data.name
      }
    })
    console.log(user);
    res.json({
  message: "Register Successful",
  userId: user.id
});

  } catch (e) {
    console.log(e);
    res.status(411).json({
      message: "User already exists with this username"
    })
  }
}

export const loginController = async (req:Request, res:Response) => {
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

    const passwordMatch = await bcryptjs.compare(parsedData.data.password, user.password);
    if (!passwordMatch) {
      res.status(403).json({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign({
      userId: user.id
    }, JWT_SECRET,{expiresIn:"1h"})

    res.cookie("token",token,{
      httpOnly:true,
      secure:process.env.NODE_ENV === "production",
      sameSite:"lax",
      maxAge: 60*60*1000
    })

    res.json({
      message: "Login Successful"
    })
  } catch (e) {

    res.status(500).json({ message: "Internal server error" });
  }

}

export const logoutController = async (req:Request, res:Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.json({ message: "Logged out" });
}