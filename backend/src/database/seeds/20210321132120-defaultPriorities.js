'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('priorities', [
    {
      name: 'Obrigatório',
      description: 'O requisito é obrigatório e essencial para o funcionamento do sistema e do negócio.',
      color: '#F12B2C',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Importante',
      description: 'O requisito é importante e desejável para os usuários do sistema.',
      color: '#FEC400',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Desejável',
      description: 'O requisito é opcional e dispensável para o funcionamento do sistema de negócio.',
      color: '#29CC97',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('priorities', null, {});
  }
};