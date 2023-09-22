import { sign } from "jsonwebtoken";

export const generateAccessToken = (username: string) => {
    return sign(username, process.env.TOKEN_SECRET as string, { expiresIn: '1800s' });
}