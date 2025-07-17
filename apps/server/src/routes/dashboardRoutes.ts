import { prismaClient } from "@repo/db/client";
import express from "express";
import { middleware } from "../middlewares/userMiddleware";
import { CreateRoomSchema } from "@repo/common/types";
import { generateAlphanumericCode } from "../utils/genSecret";

const router = express.Router();

router.post("/room", middleware, async (req, res) => {
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

router.get("/rooms", middleware, async (req, res) => {
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

router.post("/join-room", middleware, async (req, res) => {
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

router.get("/room/:id", middleware, async (req, res) => {
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

export default router;