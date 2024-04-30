//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaInventory = require('../../schemas/schemaInventory');

//REQUISIÇÃO HTTP
router.get('/', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //BUSCA TODAS AS INFORMAÇÕES DA TABELA DE INVENTARIO
    const inventory = await schemaInventory.findAll();

    //RETORNA O RESULTADO
    res.status(200).json(inventory);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: `The inventory list could not be retrieved due to an internal server error. Please reload the page or try again later.`,
      code: 500
    });
  }
});

module.exports = router;