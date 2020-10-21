import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Patrimonio from '../models/Patrimonio';
import patrimonioView from '../views/patrimonios_view';

export default {
    async show(request: Request, response: Response) {
        const { id } = request.params;
        
        const patrimoniosRepository = getRepository(Patrimonio);

        const patrimonio = await patrimoniosRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(patrimonioView.render(patrimonio));
    },

    async index(request: Request, response: Response) {
        const patrimoniosRepository = getRepository(Patrimonio);

        const patrimonios = await patrimoniosRepository.find({
            relations: ['images']
        });

        return response.json(patrimonioView.renderMany(patrimonios));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            address,
            latitude,
            longitude,
            notes
        } = request.body;
    
        const patrimoniosRepository = getRepository(Patrimonio);
        
        const requestImages = request.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return { path: image.filename }
        });
        
        const patrimonio = patrimoniosRepository.create({
            name,
            address,
            latitude,
            longitude,
            notes,
            images,
        });
    
        await patrimoniosRepository.save(patrimonio);
    
        return response.status(201).json(patrimonio);
    }
}