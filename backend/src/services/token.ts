import jwt from 'jsonwebtoken';

const publicKey = process.env.JWT_PUBLIC_KEY as string;
const privateKey = process.env.JWT_PRIVATE_KEY as string;

export default {
    sign(payload: object) {
        return jwt.sign(payload, privateKey, { algorithm: 'RS256' });
    
    },

    verify(token: string) {
        return new Promise((resolve, reject) => 
            jwt.verify(token, publicKey, (error, data) => error ? reject(error) : resolve(data))
        )
    }
}