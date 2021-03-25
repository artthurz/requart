'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('situations', [
    {
      name: 'Reprovado',
      description: 'O requisito não foi aprovado para desenvolvimento.',
      color: '#F12B2C',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Em avaliação',
      description: 'O requisito está em avalição.',
      color: '#FEC400',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Aprovado',
      description: 'O requisito foi aprovado para ser desenvolvido!',
      color: '#29CC97',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('situations', null, {});
  }
};