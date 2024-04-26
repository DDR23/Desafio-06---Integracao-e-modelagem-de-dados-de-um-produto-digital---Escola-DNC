//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaSale = require('../../schemas/schemaSale');
const schemaClient = require('../../schemas/schemaClient');

//REQUISIÇÃO HTTP
router.put('/edit/:id', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE A VENDA EXISTE
    const sale = await schemaSale.findByPk(req.params.id);
    if(!sale){
      res.status(404).json({
        error: 'Sale not found',
        message: `That sale you're looking for doesn't exist in the database.`,
        code: 404
      });
    }

    //TORNA O CAMPO 'SALE_PRICE' OPICIONAL E VERIFICA SE ALGUM VALOR FOI PASSADO
    const salePrice = parseFloat(req.body.SALE_PRICE);
    if(salePrice || salePrice == 0) {
      sale.SALE_PRICE = salePrice;
    }

    //ESSE BLOCO É RESPONSÁVEL PELO ALTERAÇÃO DO CLIENT
    //TORNA O CAMPO 'FK_CLIENT_ID' OPICIONAL E VERIFICA SE ALGUM VALOR FOI PASSADO
    const saleClient = req.body.FK_CLIENT_ID;
    if(saleClient) {
      //VERIFICA SE O CLIENTE EXISTE
      const client = await schemaClient.findByPk(saleClient);
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
      //SALA O NOVO VALOR
      sale.FK_CLIENT_ID = saleClient;
    }

    //EXECUTA O PUT
    await sale.save();

    //RETORNA O RESULTADO
    res.status(200).json(sale);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This sale could not be edited due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;