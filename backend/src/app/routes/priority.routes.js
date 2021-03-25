import { Router } from 'express';
import PriorityService from '../services/PriorityService';

const priorityRoutes = new Router();

priorityRoutes.post('/priorities', PriorityService.store);
priorityRoutes.get('/priorities', PriorityService.index);
priorityRoutes.put('/priorities/:id', PriorityService.update);
priorityRoutes.delete('/priorities/:id', PriorityService.delete);

export default priorityRoutes;
