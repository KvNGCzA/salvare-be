'use strict';
module.exports = (sequelize, DataTypes) => {
  const ActiveCaseDetail = sequelize.define('ActiveCaseDetail', {
    caseId: DataTypes.UUID,
    lawyerId: DataTypes.UUID,
    court: DataTypes.STRING,
    judgeName: DataTypes.STRING,
    trialStartDate: DataTypes.DATE,
    trialEndDate: DataTypes.DATE
  }, {});
  ActiveCaseDetail.associate = function(models) {
    // associations can be defined here
    ActiveCaseDetail.belongsTo(models.Case, {
      foreignKey: 'caseId',
      onDelete: 'cascade'
    })
    ActiveCaseDetail.belongsTo(models.User, {
      foreignKey: 'lawyerId',
      onDelete: 'cascade'
    })
  };
  return ActiveCaseDetail;
};