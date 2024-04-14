const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequilize');
const Client = require('./schemaClient');

const Sale = sequelize.define('TB_SALE', {
  SALE_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  SALE_DATE: {
    type: DataTypes.DATE,
    allowNull: false
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