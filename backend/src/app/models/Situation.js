import Sequelize, { Model } from 'sequelize';

class Situation extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        color: Sequelize.STRING,
        deleted_at: Sequelize.DATE
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Situation;
