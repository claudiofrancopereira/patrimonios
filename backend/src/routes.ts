import { Router } from 'express';

import PatrimoniosController from './controllers/Patrimonios';
const routes = Router();

routes.post('/patrimonios', PatrimoniosController.create);
routes.get('/patrimonios', PatrimoniosController.index);
routes.get('/patrimonios/:id', PatrimoniosController.show);

export default routes;
