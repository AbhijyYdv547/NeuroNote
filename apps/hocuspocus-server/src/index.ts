
import { Server } from "@hocuspocus/server";
import * as Y from "yjs";
import {prismaClient} from "@repo/db/client"
import jwt,{JwtPayload} from "jsonwebtoken"
import {parse} from "cookie"
import dotenv from "dotenv"
dotenv.config()

const PORT = Number(process.env.PORT) || 1234;

const server = Server.configure({
  port: PORT,

  onAuthenticate: async ({ token,request,documentName }) => {

    const cookieHeader = request?.headers?.cookie || "";

    const cookies = parse(cookieHeader);
    const tokenFromCookie = cookies.token;

    if (!tokenFromCookie) throw new Error("Missing auth token in cookies");


    const payload : JwtPayload = jwt.verify(tokenFromCookie, process.env.JWT_SECRET as string) as JwtPayload;


    const userId = payload?.userId;
    if (!userId) throw new Error("Invalid user");
  
    const membership = await prismaClient.roomMembership.findFirst({
      where: {
        userId,
        roomId: parseInt(documentName), // roomId is expected to be the same as documentName
      },
    });
  
    if (!membership) {
      throw new Error("Access denied to this room");
    }
  },
  


  // 🧠 Save document content when it's updated
  onStoreDocument: async ({ document, documentName }) => {
    const binary = Y.encodeStateAsUpdate(document);
    await prismaClient.document.upsert({
      where: { id: documentName },
      update: { content: binary },
      create: { id: documentName, content: binary },
    });
  },

  // 📦 Load document content when someone joins
  onLoadDocument: async ({ documentName }) => {
     const entry = await prismaClient.document.findUnique({
      where: { id: documentName },
    });

    const doc = new Y.Doc();

    if (entry) {
      Y.applyUpdate(doc, entry.content);
    } else {
      console.log("🆕 Creating new doc:", documentName);
    }

    return doc;
}});

server.listen();
