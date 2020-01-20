'use strict';
require('dotenv').config();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [{
      id: process.env.LAWYER_ID,
      name: 'Lawyer',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: process.env.ADMIN_ID,
      name: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
