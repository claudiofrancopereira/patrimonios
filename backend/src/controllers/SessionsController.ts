import { Request, Response } from 'express';

import Auth from '../services/auth';

export default {
    async login(request: Request, response: Response) {
        const { registration, password } = request.body;

        const loginOK = await Auth.authenticate(registration, password);

        return response.json(loginOK);
        
    }
}