'use strict';
const bcrypt = require('bcryptjs')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, {
        foreignKey: 'userId'})
      User.hasMany(models.Purchase, {
        foreignKey: 'userId' })
      User.belongsToMany(models.Product, {
        through: models.Purchase,
        foreignKey: 'UserId',
        otherKey: 'ProductId'})
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
        beforeCreate( User, options){
          const hashed = bcrypt.hashSync(User.password, 10)
          User.password = hashed
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};