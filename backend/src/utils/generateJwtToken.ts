import jwt from 'jsonwebtoken'
import { IUser } from '../model/userSchema.model';
const generateJwtToken = (user: IUser): string => {

    const secretOrPublicKey = process.env.JWT_SECRET_KEY as string;

    const jwtToken = jwt.sign(user.toJSON(), secretOrPublicKey, { expiresIn: '1d' })

    return jwtToken
}

export default generateJwtToken