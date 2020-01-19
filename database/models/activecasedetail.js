'use strict';
module.exports = (sequelize, DataTypes) => {
  const ActiveCaseDetail = sequelize.define('ActiveCaseDetail', {
    caseId: DataTypes.INTEGER,
    lawyerId: DataTypes.INTEGER,
    court: DataTypes.STRING,
    judgeName: DataTypes.STRING,
    trialStartDate: DataTypes.DATE,
    trialEndDate: DataTypes.DATE
  }, {});
  ActiveCaseDetail.associate = function(models) {
    // associations can be defined here
  };
  return ActiveCaseDetail;
};