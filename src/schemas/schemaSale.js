//CONFIG E IMPORTAÇÕES
const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Client = require('./schemaClient');

//ESSE SCHEMA CRIA AUTOMATICAMENTE A TABELA NO BANCO DE DADOS
const Sale = sequelize.define('TB_SALE', {
  SALE_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  SALE_PRICE: {
    type: DataTypes.DECIMAL(8,2),
    allowNull: false,
    defaultValue: 0
  },
  FK_CLIENT_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Client,
      key: 'CLIENT_ID'
    }
  }
},{
  tableName: 'TB_SALE',
  timestamps: true,
  indexes: [{
    name: 'fk_TB_SALE_TB_CLIENT1_idx',
    fields: ['FK_CLIENT_ID']
  }]
});

Sale.sync();

module.exports = Sale;