import express from "express";
const router = express.Router();
import authRoute from "./authRoute"
import passport from "passport";
import userRouter from "./userRoute"

router.use("/auth", authRoute);
router.use("/user", passport.authenticate('jwt', { session: false }), userRouter)

export default router

