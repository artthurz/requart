import { Router } from 'express';
import ComplexityService from '../services/ComplexityService';

const complexityRoutes = new Router();

complexityRoutes.post('/complexities', ComplexityService.store);
complexityRoutes.get('/complexities', ComplexityService.index);
complexityRoutes.put('/complexities/:id', ComplexityService.update);
complexityRoutes.delete('/complexities/:id', ComplexityService.delete);

export default complexityRoutes;
