import { Router } from 'express';
import RoleService from '../services/RoleService';

const roleRoutes = new Router();

roleRoutes.put('/role/:id', RoleService.update);

export default roleRoutes;
