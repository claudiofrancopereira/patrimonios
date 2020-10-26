import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import PatrimoniosController from './controllers/Patrimonios';

const routes = Router();
const upload = multer(uploadConfig['s3']);

routes.post('/patrimonios', upload.array('images'), PatrimoniosController.create);
routes.get('/patrimonios', PatrimoniosController.index);
routes.get('/patrimonios/:id', PatrimoniosController.show);

export default routes;
