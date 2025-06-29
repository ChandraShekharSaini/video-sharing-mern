import bcrypt from 'bcryptjs'

export const hashPassword = async (originalPassword: string): Promise<string> => {

    const hashedPassword = await bcrypt.hash(originalPassword, 10);

    return hashedPassword
}

export const compareHashedPassword = async (originalPassword: string, hashedPassword: string): Promise<boolean> => {
    const checkpassword = await bcrypt.compare(originalPassword, hashedPassword)

    return checkpassword
}