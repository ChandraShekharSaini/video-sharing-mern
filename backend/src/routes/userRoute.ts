import express from 'express'
const router = express.Router()
import {getUserDetails} from "../controller/user/userController"

router.get("/profile", getUserDetails)

export default router