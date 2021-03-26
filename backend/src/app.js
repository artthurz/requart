import 'dotenv/config';

import express from 'express';
import path from 'path';
import cors from 'cors';
import Youch from 'youch';
import 'express-async-errors';

import complexityRoutes from './app/routes/complexity.routes';
import priorityRoutes from './app/routes/priority.routes';
import situationRoutes from './app/routes/situation.routes';
import userRoutes from './app/routes/user.routes';
import sessionRoutes from './app/routes/session.routes';
import fileRoutes from './app/routes/file.routes';
import roleRoutes from './app/routes/role.routes';
import projectRoutes from './app/routes/project.routes';
import requirementRoutes from './app/routes/requirement.routes';
import requirementVersionRoutes from './app/routes/requirementVersion.routes';

import authMiddleware from './app/middlewares/auth';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(sessionRoutes);
    // this.server.use(authMiddleware);
    this.server.use(complexityRoutes);
    this.server.use(priorityRoutes);
    this.server.use(situationRoutes);
    this.server.use(userRoutes);
    this.server.use(fileRoutes);
    this.server.use(roleRoutes);
    this.server.use(projectRoutes);
    this.server.use(requirementRoutes);
    this.server.use(requirementVersionRoutes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
