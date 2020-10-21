import express from 'express';
import { getRepository } from 'typeorm';
import Patrimonio from './models/Patrimonio';

import './database/connection';

const app = express();
app.use(express.json());

app.post('/patrimonios', async (request, response) => {
    const {
        name,
        address,
        latitude,
        longitude,
        notes
    } = request.body;

    const patrimoniosRepository = getRepository(Patrimonio);

    const patrimonio = patrimoniosRepository.create({
        name,
        address,
        latitude,
        longitude,
        notes,
    });

    await patrimoniosRepository.save(patrimonio);

    return response.status(201).json(patrimonio);
});

app.listen(3333);