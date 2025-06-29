import express from "express";
const router = express.Router();
import { singnUpHandler } from "../controller/auth/authController"

router.post("/sign-up", singnUpHandler)


export default router

