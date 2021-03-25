'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('complexities', [
    {
      name: 'Alta',
      description: 'O requisito é de alta complexidade de desenvolvimento, exigirá muito da equipe.',
      color: '#F12B2C',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Média',
      description: 'O requisito é de média complexidade de desenvolvimento, exigirá da equipe, mas da pra fazer!',
      color: '#FEC400',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Baixa',
      description: 'O requisito é de baixa complexidade de desenvolvimento, tranquilo!',
      color: '#29CC97',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('complexities', null, {});
  }
};