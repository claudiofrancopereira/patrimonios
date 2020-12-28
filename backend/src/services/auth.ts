import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

import Token from './token';
import Users from '../models/users/User';
 
function authFailed(registration: string) {
    return new Promise(reject => reject({
        status: 401,
        code: 'UNAUTHENTICATED',
        message: `Failed to authenticate ${registration}`
    }));
}    

export default {
    async authenticate(registration: string, password: string) {       
        const usersRespository = getRepository(Users, 'dbUsers')
        
        const userOK = await usersRespository.findOne({ where: { registration }});

        if (!userOK) {
            return authFailed(registration);
        }

        const passwordOK = await bcrypt.compare(password, userOK.password);

        if (!passwordOK) {
            return authFailed(registration);
        }

        return({
            token: Token.sign({ 
                id: userOK.id,  
                role: userOK.role 
            })
        });

    }
}