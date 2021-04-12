module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('requirements', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      requirement_id: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      non_functional: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      version: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      latest_version: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      latitude: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      longitude: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      first_file_id: {
        type: Sequelize.INTEGER,
        references: { model: 'photos', key: 'id' },
        allowNull: true,
      },
      second_file_id: {
        type: Sequelize.INTEGER,
        references: { model: 'photos', key: 'id' },
        allowNull: true,
      },
      project_id: {
        type: Sequelize.INTEGER,
        references: { model: 'projects', key: 'id' },
        allowNull: false,
      },
      priority_id: {
        type: Sequelize.INTEGER,
        references: { model: 'priorities', key: 'id' },
        allowNull: false,
      },
      complexity_id: {
        type: Sequelize.INTEGER,
        references: { model: 'complexities', key: 'id' },
        allowNull: false,
      },
      situation_id: {
        type: Sequelize.INTEGER,
        references: { model: 'situations', key: 'id' },
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('requirements');
  },
};
