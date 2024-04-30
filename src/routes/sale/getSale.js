//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaSale = require('../../schemas/schemaSale');

//REQUISIÇÃO HTTP
router.get('/', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //BUSCA TODAS AS INFORMAÇÕES DA TABELA DE VENDA
    const sale = await schemaSale.findAll();

    //RETORNA O RESULTADO
    res.status(200).json(sale);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: `The sale list could not be retrieved due to an internal server error. Please reload the page or try again later.`,
      code: 500
    });
  }
});

module.exports = router;