import { Router } from 'express';
import RequirementVersionService from '../services/RequirementVersionService'

const requirementRoutes = new Router();

requirementRoutes.get('/requirements/:projectId/:parentId/', RequirementVersionService.index);

export default requirementRoutes;
