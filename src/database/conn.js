//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const mysql = require('mysql2');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_SCHEMA } = require('./config');

//CRIAR UMA CONEXÃO COM MYSQL
const connection = mysql.createConnection({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_SCHEMA
});

//EXECUTA UMA FUNÇÃO QUE ESTABELECE A CONEXÃO USANDO AS CREDENCIAIS ACIMA
async function conn(){
  try {
    await connection.connect();
    console.log('Conexão com o MySQL estabelecida com sucesso!')
  } catch (error) {
    console.log(`Erro: ${error}`)
  }
};

module.exports = conn;