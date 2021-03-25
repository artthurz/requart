import { Router } from 'express';
import RequirementVersionService from '../services/RequirementVersionService'

const requirementRoutes = new Router();

requirementRoutes.get('/requirements/:projectId/:requirementId/:nonFunctional', RequirementVersionService.index);

export default requirementRoutes;
