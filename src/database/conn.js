const mysql = require('mysql2')
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_SCHEMA } = require('./config');

const connection = mysql.createConnection({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_SCHEMA
});

async function conn(){
  try {
    await connection.connect();
    console.log('Conexão com o MySQL estabelecida com sucesso!')
  } catch (error) {
    console.log(`Erro: ${error}`)
  }
}

module.exports = conn;