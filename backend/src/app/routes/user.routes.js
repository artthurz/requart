import { Router } from 'express';
import UserService from '../services/UserService'

const userRoutes = new Router();

userRoutes.post('/users', UserService.store);
userRoutes.get('/users', UserService.index);
userRoutes.put('/users/:id', UserService.update);
userRoutes.delete('/users/:id', UserService.delete);

export default userRoutes;
