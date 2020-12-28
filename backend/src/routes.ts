import { Router } from 'express';
import multer from 'multer';

import authMiddleware from './middlewares/authMiddleware';

import uploadConfig from './config/upload';
import uploadProfile from './config/uploadProfile';

import PatrimoniosController from './controllers/PatrimoniosController';
import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';

const routes = Router();
const upload = multer(uploadConfig);
const profile = multer(uploadProfile);

routes.post('/patrimonios', upload.array('images'), PatrimoniosController.store);
routes.get('/patrimonios', authMiddleware, PatrimoniosController.index);
routes.get('/patrimonios/:id', PatrimoniosController.show);

routes.post('/users', profile.single('profile'), UsersController.store);
routes.get('/users', UsersController.index);

routes.post('/login', SessionsController.login);

export default routes;
