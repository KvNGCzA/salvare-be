'use strict';
module.exports = (sequelize, DataTypes) => {
  const DroppedCase = sequelize.define('DroppedCase', {
    caseId: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    dropReason: DataTypes.STRING,
    additionalInfo: DataTypes.TEXT
  }, {});
  DroppedCase.associate = function(models) {
    // associations can be defined here
    DroppedCase.belongsTo(models.Case, {
      foreignKey: 'caseId',
      onDelete: 'cascade'
    })
  };
  return DroppedCase;
};