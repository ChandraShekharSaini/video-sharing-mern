import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt, StrategyOptions } from "passport-jwt"
import User from "../model/userSchema.model";
import { Types } from 'mongoose'
import { RequestHandler } from "express";


const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY as string
}

export interface AuthenticatedRequest extends Request {
    user: {
        _id: Types.ObjectId
    }
}

export type AuthenticatedRequestHandler = RequestHandler<any, any, any, any, AuthenticatedRequest>

passport.use(new JWTStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload._id).select("-passport")
        if (user) return done(null, user)
        else return done(null, false)
    } catch (error) {
        done(error, false)
    }
}))

export default passport