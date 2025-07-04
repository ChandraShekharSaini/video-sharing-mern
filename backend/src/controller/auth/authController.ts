import { Request, Response, RequestHandler } from "express";
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import User from "../../model/userSchema.model";
import sendResponse from "../../utils/sendResponse"
import { hashPassword, compareHashedPassword } from "../../utils/passwordHelper"
import generateJwtToken from "../../utils/generateJwtToken";
import { ReturnDocument } from "mongodb";
interface RegisterReq extends Request {
    body: {
        email: string,
        password: string
    }
}


export const singnUpHandler: RequestHandler = async (req: RegisterReq, res: Response) => {
    console.log("-----------------sign-up-start-----------------");
    try {
        const { email, password } = req.body;

        const existedUser = await User.findOne({ email });

        if (existedUser) {
            return sendResponse(res, 400, false, "User Already Present");
        }

        const hashedPassword = await hashPassword(password)

        const newUser = await User.create({ email, password: hashedPassword, token: crypto.randomBytes(16).toString("hex") });

        return sendResponse(res, 200, true, "User Created Successfully");

    } catch (error) {
        console.log(`Error in singning up the user ${error}`);

        return sendResponse(res, 500, false, "Internal Server Error");
    }
}

export const signInHandler: RequestHandler = async (req: RegisterReq, res: Response) => {

    console.log("-----------------sign-in-start-----------------");

    const { email, password } = req.body

    console.log("data", email, password);

    try {
        const existedUser = await User.findOne({ email })

        console.log(existedUser);

        if (!existedUser) {
            return sendResponse(res, 409, false, "Account Not Present")
        }

        const result = await compareHashedPassword(password, existedUser.password)

        if (!result) {
            return sendResponse(res, 400, false, "Wrong Credentials")
        }

        const jwtToken = generateJwtToken(existedUser)

        console.log(jwtToken);
        return sendResponse(res, 200, true, "User Logged Successfully", { token: jwtToken })


    } catch (error) {
        console.log(`Error in signing in the user ${error}`);
        return sendResponse(res, 500, false, "Internal Server Error")
    }
}
