import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import Complexity from '../app/models/Complexity';
import Situation from '../app/models/Situation';
import Priority from '../app/models/Priority';
import Requirement from '../app/models/Requirement';
import Project from '../app/models/Project';

import databaseConfig from '../config/database';

const models = [
  User,
  File,
  Complexity,
  Situation,
  Priority,
  Requirement,
  Project
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }

}

export default new Database();
