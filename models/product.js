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
    }
  }
  Product.init({
    title: DataTypes.STRING,
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