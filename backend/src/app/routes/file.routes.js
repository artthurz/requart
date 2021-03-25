import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../../config/multer';

import FileService from '../services/FileService';

const fileRoutes = new Router();
const upload = multer(multerConfig);

fileRoutes.post('/files', upload.single('file'), FileService.store);

export default fileRoutes;
