import { Router } from 'express';
import ProjectService from '../services/ProjectService'

const projectRoutes = new Router();

projectRoutes.post('/projects', ProjectService.store);
projectRoutes.get('/projects', ProjectService.index);
projectRoutes.put('/projects/:id', ProjectService.update);
projectRoutes.delete('/projects/:id', ProjectService.delete);

export default projectRoutes;
