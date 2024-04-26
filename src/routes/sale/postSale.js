//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaSale = require('../../schemas/schemaSale');
const schemaClient = require('../../schemas/schemaClient');

//REQUISIÇÃO HTTP
router.post('/create', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //GUARDA O CONTEÚDO QUE VEM DO BODY
    const { FK_CLIENT_ID } = req.body;

    //VERIFICA SE O CLIENTE EXISTE
    const client = await schemaClient.findByPk(FK_CLIENT_ID);
    if (!client) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'The client does not exist.',
        code: 400
      });
    }

    //VERIFICA SE O CLIENTE ESTA MORCADO COMO DELETADO, CASO ESTEJA RETORNA ERRO
    if(client.CLIENT_DELETED) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'This customer has been subjected to a soft deletion. Please undo the deletion in order to register a sale for them.',
        code: 400
      });
    }

    //EXECUTA O POST
    const newSale = await schemaSale.create({ FK_CLIENT_ID });

    //RETORNA O RESULTADO
    res.status(201).json(newSale);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This sale could not be created due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;