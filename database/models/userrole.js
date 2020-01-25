'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    userId: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID
    },
    roleId: DataTypes.INTEGER
  }, {});
  UserRole.associate = function(models) {
    // associations can be defined here
    UserRole.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'cascade'
    })

    UserRole.belongsTo(models.Role, {
      foreignKey: 'roleId',
      onDelete: 'cascade'
    })
  };
  return UserRole;
};