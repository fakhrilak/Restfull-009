'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    tingkat: DataTypes.STRING,
    cabang: DataTypes.STRING,
    lulus: DataTypes.STRING,
    nohp: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};