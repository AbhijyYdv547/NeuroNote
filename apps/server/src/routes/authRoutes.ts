import express, { Router } from "express";
import { loginController, logoutController, signupController } from "../controllers/authController";
import { middleware } from "../middlewares/userMiddleware";

const router:Router = express.Router();

router.post("/signup", signupController)

router.post("/login", loginController)

router.post("/logout",middleware,logoutController);

export default router;