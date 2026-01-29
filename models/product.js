'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Purchase, {
        foreignKey: 'productId'})
      Product.belongsToMany(models.User, {
        through: models.Purchase,
        foreignKey: 'ProductId',
        otherKey: 'UserId'})
    }
  }
  Product.init({
    title: { type : DataTypes.STRING,
  get() {
    const capital = this.getDataValue('title')
      if (capital) {
          return capital.toUpperCase()
      } else {
          return null
      }
    }
  }, 
    storeName: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: {type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg:"stok is required",
        },
      notNull: {
        args: true,
        msg: 'stook is required'
      },
      min : 0
      }
    },
    
    BuyerId: DataTypes.INTEGER,
    imageURL:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};