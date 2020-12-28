import { Request, Response, NextFunction } from 'express';

import Token from '../services/token';

function extractToken(ctx: Request) {
    const authorization = ctx.headers.authorization || '';
    return authorization.replace('Bearer ', '').trim();
}

function handleError(error: string) {
    
    return new Promise(reject => reject({
        status: 401,
        code: 'UNAUTHENTICATED',
        message: 'Invalid token'
    }));
}    

export default async function authMiddleware(request: Request, response: Response, next: NextFunction) {
    const token = extractToken(request)
    
    
    await Token.verify(token)
        .then(() => next())
        .catch(() => response.status(401).send({ error: 'Invalid Token' }))
    
}