import { Request, Response } from "express";
import { ai } from "../lib/geminiAPI";

export const generateAIResponse = async (
  req: Request,
  res: Response,
  promptBuilder: (content: string) => string,
  resultKey: string
) => {
  try {
    const { content } = req.body;

    if (!content) {
      res.status(400).json({ message: "Missing content" });
      return;
    }

    const prompt = promptBuilder(content);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const result = response.candidates?.[0]?.content?.parts?.[0]?.text || `${resultKey} generation failed.`;

    res.status(200).json({ [resultKey]: result });

  } catch (e) {
    console.error(`Error generating ${resultKey}:`, e);
    res.status(500).json({ message: "Some error occurred" });
  }
};
