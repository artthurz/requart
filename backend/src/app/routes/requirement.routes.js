import { Router } from 'express';
import RequirementService from '../services/RequirementService'

const requirementRoutes = new Router();

requirementRoutes.post('/requirements/', RequirementService.store);
requirementRoutes.get('/requirements/:projectId', RequirementService.index);
requirementRoutes.put('/requirements/:id', RequirementService.update);
requirementRoutes.delete('/requirements/:id', RequirementService.delete);

export default requirementRoutes;
