import express from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {CreateUserSchema,SigninSchema,CreateRoomSchema} from "@repo/common/types"
import {prismaClient} from "@repo/db/client"
import cors from "cors"
import bcrypt from "bcrypt"

const app = express();
app.use(express.json())
app.use(cors())

app.post("/signup",async (req,res)=>{   
    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message:"Incorrect Inputs"
        })
        return;
    }

    try{
        const hashedPassword = await bcrypt.hash(parsedData.data.password, 10); 
        const user = await prismaClient.user.create({
        data:{
            email: parsedData.data?.email,
            password:hashedPassword,
            name:parsedData.data.name
        }
    })
    res.json({
        userId:user.id
    })
    }catch(e){
        res.status(411).json({
            message:"User already exists with this username"
        })
    }
})

app.post("/signin",async (req,res)=>{
    const parsedData = SigninSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message:"Incorrect Inputs"
        })
        return;
    }

    try{
        console.log("Parsed email:", parsedData.data.email);
        const user = await prismaClient.user.findFirst({
        where:{
            email: parsedData.data.email
        }
    })

    if(!user){
        res.status(403).json({
            message:"Not authorized"
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
    },JWT_SECRET)

    res.json({
        token
    })
    }catch (e) {
  console.error("Sign-in error:", e);
  res.status(500).json({ message: "Internal server error" });
}

})

app.post("/room",middleware,async (req,res)=>{
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message:"Incorrect Inputs"
        })
        return;
    }
    //@ts-ignore
    const userId = req.userId;
    try {
        const room = await prismaClient.room.create({
        data:{
            slug:parsedData.data.name,
            adminId:userId
        }
    })

    await prismaClient.roomMembership.create({
        data: {
          userId,
          roomId: room.id,
        },
      });
    res.json({
        roomId: room.id
    })
    } catch (e) {
        res.status(411).json({
            message:"Room already exists with this name"
        })
    }
})

app.get("/rooms",middleware,async (req,res)=>{
    try {
        const rooms = await prismaClient.room.findMany();
        console.log(rooms);
        if(rooms.length === 0){
            res.status(404).json({
                message:"No rooms found"
            })
            return;
        }
    res.json({
        rooms:rooms
    })
    } catch (e) {
        res.status(411).json({
            message:"Some error occured"
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
    console.error("Error fetching messages:", e);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

app.get("/room/:slug", middleware, async (req, res) => {
    try {
      const slug = req.params.slug;
      //@ts-ignore
      const userId: number = req.userId;
  
      const room = await prismaClient.room.findFirst({ where: { slug } });
  
      if (!room) {
        res.status(404).json({ message: "Room not found" });
        return;
      }
  
      // Log info
      console.log("🟢 Found room:", room);
      console.log("🔐 Upserting membership for user:", userId);
  
      await prismaClient.roomMembership.upsert({
        where: {
          userId_roomId: {
            userId,
            roomId: room.id,
          },
        },
        update: {},
        create: {
          userId,
          roomId: room.id,
        },
      });
  
      res.json({ room });
    } catch (err: any) {
      console.error("❌ [/room/:slug] Error:", err.message);
      console.error(err); // Full error object
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  

app.listen(3001);