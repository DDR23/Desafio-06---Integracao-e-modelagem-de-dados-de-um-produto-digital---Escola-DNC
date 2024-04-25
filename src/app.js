//CONFIG. PADRÃO DO EXPRESS
const express = require('express');
const app = express();
app.use(express.json());

//CONFIG. PADRÃO DO CORS
const cors = require('cors');
app.use(cors());

//CONFIG. PADRÃO DO DOTENV
require('dotenv').config();

//EXECUTA A FUNÇÃO DE CONEXÃO COM O BANCO DE DADOS
const conn = require('./database/conn');
conn();

//EXECUTA A FUNÇÃO DE ROTEAMENTO
const routes = require('./routes/routes');
routes(app);

//VERIFICA A EXISTENCIA OU AUSENCIA DA VARIAVEL DE AMBIENTE E ABRE UMA CONEXÃO COM O SERVIDOR, A VARIAVEL ESPERADA É O NOME DO SCHEMA DO BANCO DE DADOS DE PRODUÇÃO
if(process.env.DB_SCHEMA){
  app.listen(8080, (err) => {
    if(err) {
      console.log(`ERRO ao iniciar o servidor: ${err}`);
    } else {
      console.log('Servidor de produção no ar');
    }
  });
} else {
  app.listen(8080, (err) => {
    if (err) {
      console.log(`ERRO ao iniciar o servidor: ${err}`)
    } else {
      console.log('Servidor de teste no ar')
    }
  });
}