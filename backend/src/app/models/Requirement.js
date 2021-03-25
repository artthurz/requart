import Sequelize, { Model } from 'sequelize';

class Requirement extends Model {
  static init(sequelize) {
    super.init(
      {
        requirement_id: Sequelize.INTEGER,
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        non_functional: Sequelize.BOOLEAN,
        version: Sequelize.INTEGER,
        latest_version: Sequelize.BOOLEAN,
        project_id: Sequelize.INTEGER,
        priority_id: Sequelize.INTEGER,
        complexity_id: Sequelize.INTEGER,
        situation_id: Sequelize.INTEGER,
        deleted_at: Sequelize.DATE
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Project, { foreignKey: 'project_id', as: 'project' });
    this.belongsTo(models.Priority, { foreignKey: 'priority_id', as: 'priority'});
    this.belongsTo(models.Complexity, { foreignKey: 'complexity_id', as: 'complexity'});
    this.belongsTo(models.Situation, { foreignKey: 'situation_id', as: 'situation'});
  }

}

export default Requirement;
