import express from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/client"
import cors from "cors"
import bcrypt from "bcrypt"
import { generateAlphanumericCode } from "./genSecret"
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

const app = express();
app.use(express.json())
app.use(cors())


app.post("/signup", async (req, res) => {
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

app.post("/signin", async (req, res) => {
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

app.post("/room", middleware, async (req, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect Inputs"
    })
    return;
  }
  //@ts-ignore
  const userId = req.userId;
  const code8Digits = generateAlphanumericCode();
  try {
    const room = await prismaClient.room.create({
      data: {
        slug: parsedData.data.name,
        adminId: userId,
        secretCode: code8Digits
      }
    })

    await prismaClient.roomMembership.create({
      data: {
        userId,
        roomId: room.id,
      },
    });
    res.json({
      roomId: room.id,
      secretCode: room.secretCode,
    })
  } catch (e) {
    res.status(411).json({
      message: "Room already exists with this name"
    })
  }
})

app.get("/rooms", middleware, async (req, res) => {
  try {
    //@ts-ignore
    const userId: number = req.userId;
    const rooms = await prismaClient.room.findMany({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        admin: true,
      },
    });

    if (rooms.length === 0) {
      res.status(404).json({
        message: "No rooms found"
      })
      return;
    }
    res.json({
      rooms: rooms
    })
  } catch (e) {
    res.status(411).json({
      message: "Some error occured"
    })
  }
})

app.get("/chats/:roomId", async (req, res) => {
  try {
    const roomId = Number(req.params.roomId);
    if (isNaN(roomId)) {
      res.status(400).json({ message: "Invalid roomId" });
      return;
    }

    const limit = parseInt(req.query.limit as string) || 50;
    const cursor = req.query.cursor ? parseInt(req.query.cursor as string) : undefined;

    const messages = await prismaClient.chat.findMany({
      where: {
        roomId,
        ...(cursor && { id: { lt: cursor } }) // Pagination logic
      },
      orderBy: {
        id: "desc"
      },
      take: limit,
    });

    res.json({
      messages: messages.reverse(), // Return in ascending order for frontend
      nextCursor: messages.length ? messages[messages.length - 1]!.id : null
    });
  } catch (e) {

    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

app.post("/join-room", middleware, async (req, res) => {
  const { secretCode } = req.body;

  if (!secretCode) {
    res.status(400).json({ message: "Secret code is required" });
    return;
  }
  //@ts-ignore
  const userId: number = req.userId;

  try {
    const room = await prismaClient.room.findUnique({
      where: { secretCode },
    });

    if (!room) {
      res.status(404).json({ message: "Room not found with provided code" });
      return;
    }

    const existingMembership = await prismaClient.roomMembership.findUnique({
      where: {
        userId_roomId: {
          userId,
          roomId: room.id,
        },
      },
    });

    if (!existingMembership) {
      await prismaClient.roomMembership.create({
        data: {
          userId,
          roomId: room.id,
        },
      });
    }

    res.json({ room });
    return;
  } catch (err: any) {

    res.status(500).json({ message: "Internal server error" });
    return;
  }
});

app.get("/room/:id", middleware, async (req, res) => {
  try {
    const roomId = parseInt(req.params.id as string);
    if (isNaN(roomId)) {
      res.status(400).json({ message: "Invalid room ID" });
      return;
    }

    //@ts-ignore
    const userId = req.userId;

    const room = await prismaClient.room.findFirst({
      where: {
        id: roomId,
        members: {
          some: {
            userId: userId,
          },
        },
      },
    });

    if (!room) {
      res.status(403).json({ message: "Access denied or room not found" });
      return;
    }

    res.json({ room });
  } catch (err) {

    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/summarize", middleware, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      res.status(400).json({ message: "Missing content" });
      return;
    }
    const prompt = `Please summarize the following text in **approximately 50 words**. After the summary, clearly state the **tone of the text** (e.g., formal, informative, emotional, etc.).
          Text:
          "${content}"`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const summary = response.candidates?.[0]?.content?.parts?.[0]?.text || "Summary generation failed.";
    res.status(200).json(
      { summary }
    )
  } catch (e) {
    res.status(500).json({
      message: "Some error occured"
    })
  }
});

app.post("/check-grammar", middleware, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      res.status(400).json({ message: "Missing content" });
      return;
    }
    const prompt = `Please check the following text for grammatical errors. Keep your response concise — no more than 50 words total.

          For each issue you find:
          1. Mention the incorrect phrase.
          2. Provide the corrected version.
          3. Briefly explain the issue.

          Format your response with clear spacing and line breaks like this:

          Incorrect: "your example"
          Correct: "your example fixed"
          Issue: Brief explanation here.

          Text to check:

          "${content}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const grammar = response.candidates?.[0]?.content?.parts?.[0]?.text || "Grammar summary generation failed.";
    res.status(200).json(
      { grammar }
    )
  } catch (e) {
    res.status(500).json({
      message: "Some error occured"
    })
  }
});


app.listen(3001);