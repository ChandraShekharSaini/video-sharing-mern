import { Request, Response, RequestHandler } from "express";
import crypto from 'crypto'
import User from "../../model/userSchema.model";
import sendResponse from "../../utils/sendResponse"
import { hashPassword } from "../../utils/passwordHelper"
interface RegisterReq extends Request {
    body: {
        email: string,
        password: string
    }
}



export const singnUpHandler: RequestHandler = async (req: RegisterReq, res: Response) => {
    console.log(req.body);
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
