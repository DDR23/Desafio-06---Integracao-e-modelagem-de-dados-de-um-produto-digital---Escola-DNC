//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaClient = require('../../schemas/schemaClient');

//REQUISIÇÃO HTTP
router.post('/create', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //GUARDA O CONTEÚDO QUE VEM DO BODY
    const { CLIENT_USERNAME, CLIENT_PASSWORD } = req.body;

    //VERIFICA SE JÁ EXISTE ALGUM CLIENTE COM O NOME PASSADO NO 'CLIENT_USERNAME'
    const usernameNotUnique = await schemaClient.findOne({ where: { CLIENT_USERNAME } });
    if (usernameNotUnique) {
      return res.status(409).json({
        error: 'This username already exists',
        message: 'There is already a username with that name in the database.',
        code: 409
      });
    }

    //EXECUTA O POST
    const newClient = await schemaClient.create({ CLIENT_USERNAME, CLIENT_PASSWORD });

    //RETORNA O RESULTADO
    res.status(201).json(newClient);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This client could not be created due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;