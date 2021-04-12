import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../../config/multerAvatar';

import AvatarService from '../services/AvatarService';

const avatarRoutes = new Router();
const upload = multer(multerConfig);

avatarRoutes.post('/files', upload.single('file'), AvatarService.store);
avatarRoutes.put('/files/:id', AvatarService.update);
avatarRoutes.delete('/files/:id', AvatarService.delete);

export default avatarRoutes;
