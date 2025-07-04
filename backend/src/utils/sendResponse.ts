import { Response } from "express"

interface ResponseObject {
    [key: string]: unknown
}

const sendResponse = (res: Response, status: number, success: boolean, message: string, user: ResponseObject = {}) => {

    res.status(status).json({ success, message, user })

}

export default sendResponse