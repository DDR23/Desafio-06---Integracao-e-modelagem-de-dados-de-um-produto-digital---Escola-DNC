//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaOrder = require('../../schemas/schemaOrder');
const schemaInventory = require('../../schemas/schemaInventory');
const schemaSale = require('../../schemas/schemaSale');
const schemaProduct = require('../../schemas/schemaProduct');

//REQUISIÇÃO HTTP
router.delete('/delete/:id', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE A ORDEM EXISTE
    const order = await schemaOrder.findByPk(req.params.id);
    if (!order) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'The order does not exist.',
        code: 400
      });
    }

    //VERIFICA SE ALGUM INVENTARIO COM O PRODUTO PASSADO NO 'FK_PRODUCT_ID' EXISTE
    const inventory = await schemaInventory.findOne({ where: { FK_PRODUCT_ID: order.FK_PRODUCT_ID } });
    if (!inventory) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'The inventory does not exist.',
        code: 400
      });
    }

    //VERIFICA SE O PRODUTO EXISTE
    const product = await schemaProduct.findByPk(order.FK_PRODUCT_ID);
    if(!product) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'The product does not exist.',
        code: 400
      });
    }

    //VERIFICA SE A VENDA EXISTE
    const sale = await schemaSale.findByPk(order.FK_SALE_ID);
    if(!sale) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'The sale does not exist.',
        code: 400
      });
    }

    //DEVOLVE O PRODUTO PARA O INVENTARIO E ATUALIZA O 'INVENTORY_QUANTITY'
    const updatedQuantity = inventory.INVENTORY_QUANTITY + order.ORDER_QUANTITY;
    await schemaInventory.update({ INVENTORY_QUANTITY: updatedQuantity }, { where: { FK_PRODUCT_ID: order.FK_PRODUCT_ID } });

    //RETIRA O VALOR DOS PRODUTOS DA ORDEM E ATUALIZA O 'SALE_PRICE' 
    const salePrice = order.ORDER_QUANTITY * product.PRODUCT_PRICE;
    const updatedSalePrice = sale.SALE_PRICE - salePrice;
    await schemaSale.update({ SALE_PRICE: updatedSalePrice }, { where: { SALE_ID: order.FK_SALE_ID } });

    //EXECUTA O DELETE
    await order.destroy();

    //RETORNA O RESULTADO
    res.status(200).json({
      message: 'Order deleted successfully',
      code: 200
    });

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This order could not be deleted due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;