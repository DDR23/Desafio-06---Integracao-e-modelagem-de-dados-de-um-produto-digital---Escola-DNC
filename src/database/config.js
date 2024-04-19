//ATRIBUI VALOR AS VARIÁVEIS DE ACORDO COM A EXISTENCIA DAS VARIAVEIS DE AMBIENTE
module.exports = {
  DB_USER: process.env.DB_USER || process.env.DB_LOCAL_USER,
  DB_PASSWORD: process.env.DB_PASSWORD || process.env.DB_LOCAL_PASSWORD,
  DB_HOST: process.env.DB_HOST || process.env.DB_LOCAL_HOST,
  DB_PORT: process.env.DB_PORT || process.env.DB_LOCAL_PORT,
  DB_SCHEMA: process.env.DB_SCHEMA || process.env.DB_LOCAL_SCHEMA,
}