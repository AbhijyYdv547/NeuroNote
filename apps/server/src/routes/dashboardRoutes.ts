import express from "express";
import { middleware } from "../middlewares/userMiddleware";
import { createRoomController, getAllRoomController, joinRoomByCodeController, joinRoomByIdController } from "../controllers/dashboardController";

const router = express.Router();

router.post("/room", middleware,createRoomController )

router.get("/rooms", middleware,getAllRoomController )

router.post("/join-room", middleware, joinRoomByCodeController);

router.get("/room/:id", middleware, joinRoomByIdController);

export default router;