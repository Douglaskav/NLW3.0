import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';
import UsersAuthController from './controllers/UsersAuthController';
import UsersEmailController from './controllers/UsersEmailController';

import authMiddleware from './middlewares/authUser';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

routes.post('/users', UsersController.create);
routes.post('/users/auth', UsersAuthController.authenticate);
routes.post('/users/send', UsersEmailController.sendEmail);

routes.post('/users/change', UsersEmailController.changePassword);

routes.get('/me', UsersController.index);


export default routes;
