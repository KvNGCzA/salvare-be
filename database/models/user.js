'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    lawFirm: DataTypes.STRING,
    password: DataTypes.STRING,
    officeAddress: DataTypes.STRING,
    yearsOfExperience: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.UserRole, {
      foreignKey: 'userId',
      onDelete: 'cascade'
    })

    User.hasMany(models.ActiveCaseDetail, {
      foreignKey: 'lawyerId',
      onDelete: 'cascade'
    })
  };
  return User;
};