import { Router } from 'express';
import SituationService from '../services/SituationService'

const situationRoutes = new Router();

situationRoutes.post('/situations', SituationService.store);
situationRoutes.get('/situations', SituationService.index);
situationRoutes.put('/situations/:id', SituationService.update);
situationRoutes.delete('/situations/:id', SituationService.delete);

export default situationRoutes;
