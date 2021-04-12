import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../../config/multerAvatar';

import PhotoService from '../services/PhotoService';

const photoRoutes = new Router();
const upload = multer(multerConfig);

photoRoutes.post('/requirements/files', upload.single('file'), PhotoService.store);
photoRoutes.put('/requirements/files/:id', PhotoService.update);
photoRoutes.delete('/requirements/files/:id', PhotoService.delete);

export default photoRoutes;
