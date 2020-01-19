'use strict';
module.exports = (sequelize, DataTypes) => {
  const DroppedCase = sequelize.define('DroppedCase', {
    caseId: DataTypes.INTEGER,
    dropReason: DataTypes.STRING,
    additionalInfo: DataTypes.TEXT
  }, {});
  DroppedCase.associate = function(models) {
    // associations can be defined here
  };
  return DroppedCase;
};