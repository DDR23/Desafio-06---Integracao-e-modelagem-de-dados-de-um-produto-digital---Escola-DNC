//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaOrder = require('../../schemas/schemaOrder');

//REQUISIÇÃO HTTP
router.get('/:id', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE A ORDEM EXISTE
    const order = await schemaOrder.findByPk(req.params.id);
    if(!order){
      return res.status(404).json({
        error: 'Order not found',
        messege: `That order you're looking for doesn't exist in the database.`,
        code: 404
      });
    }

    //RETORNA O RESULTADO
    res.status(200).json(order);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'Unable to obtain this order due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router; 