const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

require('dotenv').config();

const conn = require('./database/conn');
conn();

const routes = require('./routes/routes');
routes(app);

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
  })
}