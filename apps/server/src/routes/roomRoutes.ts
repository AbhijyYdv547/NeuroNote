import { middleware } from "../middlewares/userMiddleware"
import express, { Router } from "express"
import { getChatsController, grammarCheckContent, summarizeContent, tokenController } from "../controllers/roomController";

const router:Router = express.Router();

router.get("/chats/:roomId", getChatsController );

router.post("/summarize", middleware, summarizeContent );

router.post("/check-grammar", middleware, grammarCheckContent);

router.get("/get-token",tokenController)

export default router;