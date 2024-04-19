//CONFIG E IMPORTAÇÕES
const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

//ESSE SCHEMA CRIA AUTOMATICAMENTE A TABELA NO BANCO DE DADOS
const Client = sequelize.define('TB_CLIENT', {
  CLIENT_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  CLIENT_USERNAME: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: 'COL_USERNAME_UNIQUE'
  },
  CLIENT_PASSWORD: {
    type: DataTypes.STRING(64),
    allowNull: false
  }
},{
  tableName: 'TB_CLIENT',
  timestamps: true,
  indexes: [{
    name: 'COL_USERNAME_UNIQUE',
    unique: true,
    fields: ['CLIENT_USERNAME']
  }]
});

Client.sync();

module.exports = Client;