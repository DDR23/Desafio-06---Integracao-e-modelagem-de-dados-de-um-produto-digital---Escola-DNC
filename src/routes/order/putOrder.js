//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaOrder = require('../../schemas/schemaOrder');
const schemaInventory = require('../../schemas/schemaInventory');
const schemaSale = require('../../schemas/schemaSale');
const schemaProduct = require('../../schemas/schemaProduct');

//REQUISIÇÃO HTTP
router.put('/edit/:id', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //RETORNA ERRO CASO A QUANTIDADE SEJA MENOR QUE 1
    const { ORDER_QUANTITY } = req.body;
    if (ORDER_QUANTITY < 1) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'ORDER_QUANTITY must be at least 1.',
        code: 400
      });
    }

    //VERIFICA SE A ORDEM EXISTE
    const order = await schemaOrder.findByPk(req.params.id);
    if(!order){
      return res.status(404).json({
        error: 'Order not found',
        message: `That order you're looking for doesn't exist in the database.`,
        code: 404
      });
    }
    
    //VERIFICA SE O PRODUTO ESTA MORCADO COMO DELETADO, CASO ESTEJA RETORNA ERRO
    const product = await schemaProduct.findByPk(order.FK_PRODUCT_ID);
    if(product.PRODUCT_DELETED) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'This product has been subject to soft deletion. Undo the deletion to register an order with it.',
        code: 400
      });
    }
    
    //VERIFICA SE O PRODUTO TEM A QUANTIDADE NECESSÁRIA DISPONÍVEL NO INVENTARIO 
    const inventory = await schemaInventory.findOne({ where: { FK_PRODUCT_ID: order.FK_PRODUCT_ID } });
    const sale = await schemaSale.findByPk(order.FK_SALE_ID);
    const oldQuantity = order.ORDER_QUANTITY;
    const newQuantity = ORDER_QUANTITY;
    if(inventory.INVENTORY_QUANTITY + oldQuantity < newQuantity) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'The product quantity is not sufficient.',
        code: 400
      });
    }

    //SALVA O NOVO VALOR
    order.ORDER_QUANTITY = parseInt(newQuantity);

    //ATUALIZA A QUANTIDADE NA TABELA INVENTARIO
    const updateQuantity = inventory.INVENTORY_QUANTITY + oldQuantity - newQuantity;
    await schemaInventory.update({ INVENTORY_QUANTITY: updateQuantity }, { where: { FK_PRODUCT_ID: order.FK_PRODUCT_ID } });

    //ATUALIZA O VALOR NA TABELA VENDA
    const totalPrice = newQuantity * product.PRODUCT_PRICE;
    const updatedSalePrice = sale.SALE_PRICE - oldQuantity * product.PRODUCT_PRICE + totalPrice;
    await schemaSale.update({ SALE_PRICE: updatedSalePrice }, { where: { SALE_ID: order.FK_SALE_ID } });

    //EXECUTA O PUT
    await order.save();

    //RETORNA O RESULTADO
    res.status(200).json(order);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This order could not be edited due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;