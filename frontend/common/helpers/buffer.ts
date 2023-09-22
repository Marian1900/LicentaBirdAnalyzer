import { Buffer } from 'buffer'

export const decodeBase64 = (data: string): string => {
    const decoded = Buffer.from(data, 'base64').toString('ascii');
    return decoded;
}