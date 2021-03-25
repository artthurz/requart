import { Router } from 'express';
import SessionService from '../services/SessionService'

const sessionRoutes = new Router();

sessionRoutes.post('/sessions', SessionService.store);

export default sessionRoutes;
