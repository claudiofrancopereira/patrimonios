import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/users/User';

export default {
    async index(request: Request, response: Response) {
        const usersRepository = getRepository(User, 'dbUsers');
        
        const users = await usersRepository.find()

        return response.json(users);
        
    },

    async store(request: Request, response: Response) {
        
        const {
            name,
            email,
            registration,
            password,
        } = request.body;
    
        const usersRepository = getRepository(User, 'dbUsers');

        /*const userExists = usersRepository.findOne({ where: { registration }});

        if (userExists) {
            return response.sendStatus(409);
        }*/
        
        //LOCAL
        //const profileImage = request.file as Express.Multer.File;
        
        
        //S3
        //const requestImages = request.files as Express.MulterS3.File[];

        //const images = requestImages.map(image => {
            //LOCAL
            
        //    return { path: image.filename }

            //S3
            //return { path: image.key }
        //});
        
        const user = usersRepository.create({
            name,
            email,
            registration,
            password,
            image: request.file.filename
        });
    
        await usersRepository.save(user);
        
        return response.status(201).json({ "id": user.id });
    }
}