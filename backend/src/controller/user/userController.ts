import { use } from "passport";
import { AuthenticatedRequestHandler } from "../../config/passportStrategy"
import User from "../../model/userSchema.model";
import sendResponse from "../../utils/sendResponse"


export const getUserDetails: AuthenticatedRequestHandler = async (req, res) => {

    try {
        if (req.user instanceof User) {
            
            const userId = req.user._id

            if (!userId) {
                return sendResponse(res, 400, false, "Please sign In to continue")
            }

            const user = await User.findById(userId).select("-password")

            console.log(user);
            if (!user) {
                return sendResponse(res, 400, false, "User detail not found")
            }

            return sendResponse(res, 200, true, "User details found", {user} )
        }


    } catch (error) {
        console.log(`Error is sending user details ${error}`);
        return sendResponse(res, 500, false, "Internal Server Error",)
    }
}
