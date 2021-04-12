'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      name: 'Administrador',
      login: 'admin',
      password_hash: '$2a$08$nMmVo7v0Ho6wLh6OFj422eWQIExXVU..axpPwGitl8sau/pesUwQe',
      admin: true,
      email: 'admin@requart.com',
      avatar_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};