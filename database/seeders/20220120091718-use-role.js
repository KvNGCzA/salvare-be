'use strict';
require('dotenv').config();
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserRoles', [{
      userId: process.env.SUPER_ADMIN_ID,
      roleId: process.env.ADMIN_ID,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserRoles', null, {});
  }
};
