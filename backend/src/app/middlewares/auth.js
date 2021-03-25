import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import { promisify } from 'util';
import { Router } from 'express';

const authMiddleware = new Router();

async function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userID = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
}

authMiddleware.use(auth);

export default authMiddleware;
