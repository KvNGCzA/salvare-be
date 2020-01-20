'use strict';
module.exports = (sequelize, DataTypes) => {
  const Case = sequelize.define('Case', {
    shortDescription: DataTypes.TEXT,
    longDescription: DataTypes.TEXT,
    status: DataTypes.STRING,
    state: DataTypes.STRING,
    reporterName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {});
  Case.associate = function(models) {
    // associations can be defined here
    Case.hasMany(models.DroppedCase, {
      foreignKey: 'caseId',
      onDelete: 'cascade'
    })
  };
  return Case;
};