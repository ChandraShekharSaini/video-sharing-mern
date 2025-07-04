import express from "express";
const router = express.Router();
import { singnUpHandler, signInHandler } from "../controller/auth/authController"

router.post("/sign-up", singnUpHandler)
router.post("/sign-in", signInHandler)


export default router

