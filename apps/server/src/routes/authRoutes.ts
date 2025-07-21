import express, { Router } from "express";
import { loginController, signupController } from "../controllers/authController";

const router:Router = express.Router();

router.post("/signup", signupController)

router.post("/login", loginController)

export default router;