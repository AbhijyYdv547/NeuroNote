import { middleware } from "../middlewares/userMiddleware"
import express from "express"
import { getChatsController, grammarCheckContent, summarizeContent } from "../controllers/roomController";

const router = express.Router();

router.get("/chats/:roomId", getChatsController );

router.post("/summarize", middleware, summarizeContent );

router.post("/check-grammar", middleware, grammarCheckContent);

export default router;