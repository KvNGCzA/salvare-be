'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ActiveCaseDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      caseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      lawyerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      court: {
        type: Sequelize.STRING
      },
      judgeName: {
        type: Sequelize.STRING
      },
      trialStartDate: {
        type: Sequelize.DATE
      },
      trialEndDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ActiveCaseDetails');
  }
};