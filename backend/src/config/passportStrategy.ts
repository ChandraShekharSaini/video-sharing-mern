import passport from "passport";
import { Strategy as JWTSTRATEGY, ExtractJwt, StrategyOptions } from "passport-jwt"
import User from "../model/userSchema.model";

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY as string
}

passport.use(new JWTSTRATEGY(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload._id).select("passport")
        if (user) return done(null, user)
        else return done(null, false)
    } catch (error) {
        done(error, false)
    }
}))

export default passport