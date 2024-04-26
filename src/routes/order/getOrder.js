//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaOrder = require('../../schemas/schemaOrder');

//REQUISIÇÃO HTTP
router.get('/', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //BUSCA TODAS AS INFORMAÇÕES DA TABELA DE ORDEM
    const order = await schemaOrder.findAll();

    //RETORNA O RESULTADO
    res.status(200).json(order);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: `The order list could not be retrieved due to an internal server error. Please try again later.`,
      code: 500
    });
  }
});

module.exports = router;