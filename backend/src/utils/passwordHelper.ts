import bcrypt from 'bcryptjs'

export const hashPassword = async (originalPassword: string): Promise<string> => {

    const hashedPassword = await bcrypt.hash(originalPassword, 10);

    return hashedPassword
}