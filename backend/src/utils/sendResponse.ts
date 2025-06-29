import { Response } from "express"

interface ResponseObject {
    [key: string]: unknown
}

const sendResponse = (res: Response, status: number, success: boolean, message: string, data: ResponseObject = {}) => {

    res.status(status).json({ success, message, data })

}

export default sendResponse