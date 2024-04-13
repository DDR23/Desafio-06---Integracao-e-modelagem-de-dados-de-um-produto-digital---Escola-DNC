const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequilize');

const Product = sequelize.define('TB_PRODUCT', {
  PRODUCT_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  PRODUCT_NAME: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: 'PRODUCT_NAME_UNIQUE'
  },
  PRODUCT_DESCRIPTION: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  PRODUCT_PRICE: {
    type: DataTypes.DECIMAL(6,2),
    allowNull: false
  }
},{
  tableName: 'TB_PRODUCT',
  timestamps: true,
  indexes: [{
    name: 'PRODUCT_NAME_UNIQUE',
    unique: true,
    fields: ['PRODUCT_NAME']
  }]
});

Product.sync();

module.exports = Product;