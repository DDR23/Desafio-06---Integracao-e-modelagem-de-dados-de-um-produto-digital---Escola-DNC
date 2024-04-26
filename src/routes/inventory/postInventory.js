//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaInventory = require('../../schemas/schemaInventory');
const schemaProduct = require('../../schemas/schemaProduct');

//REQUISIÇÃO HTTP
router.post('/create', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //GUARDA O CONTEÚDO QUE VEM DO BODY
    const { INVENTORY_QUANTITY, FK_PRODUCT_ID } = req.body;

    //VERIFICA SE O PRODUTO EXISTE
    const product = await schemaProduct.findByPk(FK_PRODUCT_ID);
    if (!product) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'The product does not exist.',
        code: 400
      });
    }

    //VERIFICA SE O PRODUTO ESTA MORCADO COMO DELETADO, CASO ESTEJA RETORNA ERRO
    if(product.PRODUCT_DELETED) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'This product has been subject to soft deletion. Undo the deletion to register an order with it.',
        code: 400
      });
    }

    //VERIFICA SE UM INVENTARIO COM O PRODUTO JÁ EXISTE, CASO EXISTA ADICIONA A QUANTIDADE, CASO NAO EXISTA CRIA UM INVENTARIO
    let inventory = await schemaInventory.findOne({ where: { FK_PRODUCT_ID } });
    if (inventory) {
      inventory.INVENTORY_QUANTITY += +INVENTORY_QUANTITY;
      await inventory.save();
    } else {
      inventory = await schemaInventory.create({ INVENTORY_QUANTITY: +INVENTORY_QUANTITY, FK_PRODUCT_ID });
    }

    //RETORNA O RESULTADO
    res.status(201).json(inventory);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This inventory could not be created due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;