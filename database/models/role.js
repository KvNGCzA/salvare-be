'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    // associations can be defined here
    Role.hasMany(models.UserRole, {
      foreignKey: 'roleId',
      onDelete: 'cascade'
    })
  };
  return Role;
};