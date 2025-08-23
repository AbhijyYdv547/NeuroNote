import { CreateUserSchema, SigninSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import bcryptjs from "bcryptjs"
import { Request,Response } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const signupController =  async (req:Request, res:Response) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect Inputs"
    })
    return;
  }

    const trimmedPassword = parsedData.data.password.trim();
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/;

    if (!regex.test(trimmedPassword)) {
      res.status(400).json({ message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.' });
      return;
    }

    const existingUser =  await prismaClient.user.findFirst({
      where: {
        email: parsedData.data.email
      }
    })
    if (existingUser) {
      res.status(409).json({ error: "Email already in use" });
      return;
    }

  try {
    const hashedPassword = await bcryptjs.hash(parsedData.data.password, 10);
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data?.email,
        password: hashedPassword,
        name: parsedData.data.name
      }
    })
    res.status(201).json({
  message: "Register Successful",
  userId: user.id
});

  } catch (e) {
    res.status(409).json({
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
    }, process.env.JWT_SECRET as string,{expiresIn:"1h"})

    res.cookie("token",token,{
      httpOnly:true,
      secure:process.env.NODE_ENV === "production",
      sameSite:"none",
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
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
  });

  res.json({ message: "Logged out" });
}

export const myInfoController = async(req:Request, res:Response) => {
    try {
          const userId = req.userId;
  if (typeof userId !== "number") {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const result = await prismaClient.user.findUnique({
    where:{
      id: userId
    }
  })

  if (!result) {
  res.status(404).json({ message: "User not found" });
  return;
}

  res.json({
      user:{
          id: result.id,
          name: result?.name
      }
  })
  } catch (e) {
console.error("myInfoController error:", e);
    res.status(500).json({ message: "Internal server error" });
  }
}