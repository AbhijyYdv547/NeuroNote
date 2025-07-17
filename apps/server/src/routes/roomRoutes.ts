import { prismaClient } from "@repo/db/client";
import { middleware } from "../middlewares/userMiddleware";
import express from "express"
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

router.get("/chats/:roomId", async (req, res) => {
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

router.post("/summarize", middleware, async (req, res) => {
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

router.post("/check-grammar", middleware, async (req, res) => {
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

export default router;