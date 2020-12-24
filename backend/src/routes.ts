import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';
import UsersAuthController from './controllers/UsersAuthController';
import UsersRecoveryPasswordController from './controllers/UsersRecoveryPasswordController';

import authMiddleware from './middlewares/authUser';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

routes.post('/users', UsersController.create);
routes.post('/users/auth', UsersAuthController.authenticate);

routes.post('/users/send', UsersRecoveryPasswordController.sendEmail);
routes.post('/users/change', UsersRecoveryPasswordController.changePassword);

routes.get('/me', authMiddleware, UsersController.index);


export default routes;
