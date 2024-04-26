//CONFIG E IMPORTAÇÕES
const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Sale = require('./schemaSale');
const Product = require('./schemaProduct');

//ESSE SCHEMA CRIA AUTOMATICAMENTE A TABELA NO BANCO DE DADOS
const Order = sequelize.define('TB_ORDER', {
  ORDER_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ORDER_QUANTITY: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  FK_SALE_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Sale,
      key: 'SALE_ID'
    }
  },
  FK_PRODUCT_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'PRODUCT_ID'
    }
  }
},{
  tableName: 'TB_ORDER',
  timestamps: true,
  indexes: [{
    name: 'fk_TB_ORDER_TB_SALE1_idx',
    fields: ['FK_PRODUCT_ID']
  },{
    name: 'fk_TB_ORDER_TB_PRODUCT1_idx',
    fields: ['FK_PRODUCT_ID']
  }]
});

Order.sync();

module.exports = Order;