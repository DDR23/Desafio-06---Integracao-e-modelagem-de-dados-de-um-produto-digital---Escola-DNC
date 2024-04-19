//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_SCHEMA } = require('./config');

//USA O SEQUELIZE PARA ESTABELECER UMA CONEXÃO
const sequelize = new Sequelize({
  dialect: 'mysql',
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_SCHEMA,
});

module.exports = sequelize;