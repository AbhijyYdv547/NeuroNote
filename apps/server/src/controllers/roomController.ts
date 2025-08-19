import { prismaClient } from "@repo/db/client";
import { Request,Response } from "express";
import { generateAIResponse } from "../utils/aiHelpers";

export const getChatsController = async (req:Request, res:Response) => {
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
}


export const summarizeContent = (req: Request, res: Response) => {
  const buildSummaryPrompt = (content: string) => `
    Please summarize the following text in **approximately 50 words**. After the summary, clearly state the **tone of the text** (e.g., formal, informative, emotional, etc.).
    Text:
    "${content}"
  `;
  return generateAIResponse(req, res, buildSummaryPrompt, "summary");
};

export const grammarCheckContent = (req: Request, res: Response) => {
  const buildGrammarPrompt = (content: string) => `
    Please check the following text for grammatical errors. Keep your response concise — no more than 50 words total.

    For each issue you find:
    1. Mention the incorrect phrase.
    2. Provide the corrected version.
    3. Briefly explain the issue.

    Format your response with clear spacing and line breaks like this:

    Incorrect: "your example"
    Correct: "your example fixed"
    Issue: Brief explanation here.

    Text to check:
    "${content}"
  `;
  return generateAIResponse(req, res, buildGrammarPrompt, "grammar");
};