//CONFIG E IMPORTAÇÕES
const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Product = require('./schemaProduct');

//ESSE SCHEMA CRIA AUTOMATICAMENTE A TABELA NO BANCO DE DADOS
const Inventory = sequelize.define('TB_INVENTORY', {
  INVENTORY_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  INVENTORY_QUANTITY: {
    type: DataTypes.INTEGER,
    allowNull: false
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
  tableName: 'TB_INVENTORY',
  timestamps: true,
  indexes: [{
    name: 'fk_TB_INVENTORY_TB_PRODUCT_idx',
    fields: ['FK_PRODUCT_ID']
  }]
});

Inventory.sync();

module.exports = Inventory;