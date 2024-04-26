//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaOrder = require('../../schemas/schemaOrder');
const schemaSale = require('../../schemas/schemaSale');
const schemaProduct = require('../../schemas/schemaProduct');
const schemaInventory = require('../../schemas/schemaInventory');

//REQUISIÇÃO HTTP
router.post('/create', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //GUARDA O CONTEÚDO QUE VEM DO BODY
    const { ORDER_QUANTITY, FK_SALE_ID, FK_PRODUCT_ID } = req.body;

    //RETORNA ERRO CASO A QUANTIDADE SEJA MENOR QUE 1
    if (ORDER_QUANTITY < 1) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'ORDER_QUANTITY must be at least 1.',
        code: 400
      });
    }

    //VERIFICA SE A VENDA EXISTE
    const sale = await schemaSale.findByPk(FK_SALE_ID);
    if (!sale) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'The sale does not exist.',
        code: 400
      });
    }

    //VERIFICA SE O PRODUTO EXISTE
    const product = await schemaProduct.findByPk(FK_PRODUCT_ID);
    if (!product) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'The product does not exist.',
        code: 400
      });
    }

    //VERIFICA SE O PRODUTO EXISTE E SE TEM A QUANTIDADE NECESSÁRIA DISPONIVEL NO INVENTARIO
    const inventory = await schemaInventory.findOne({ where: { FK_PRODUCT_ID } });
    if(!inventory || inventory.INVENTORY_QUANTITY < ORDER_QUANTITY) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'The product quantity is not sufficient.',
        code: 400
      });
    }

    //VERIFICA SE UMA ORDEM COM O PRODUTO E A VENDA JÁ EXISTE, CASO EXISTA ADICIONA A QUANTIDADE, CASO NAO EXISTA CRIA UMA ORDEM
    let order = await schemaOrder.findOne({ where: { FK_SALE_ID, FK_PRODUCT_ID } });
    if(order) {
      const newQuantity = order.ORDER_QUANTITY + ORDER_QUANTITY;
      await schemaOrder.update({ ORDER_QUANTITY: newQuantity }, { where: { FK_SALE_ID, FK_PRODUCT_ID } });
      order = await schemaOrder.findOne({ where: { FK_SALE_ID, FK_PRODUCT_ID } });
    } else {
      order = await schemaOrder.create({ ORDER_QUANTITY, FK_SALE_ID, FK_PRODUCT_ID });
    }

    //SUBITRAI DO INVENTARIO OS PRODUTOS INCLUIDOS NA ORDEM
    const updateQuantity = inventory.INVENTORY_QUANTITY - ORDER_QUANTITY;
    await schemaInventory.update({ INVENTORY_QUANTITY: updateQuantity }, { where: { FK_PRODUCT_ID } });

    //ADICIONA NA VENDA O VALOR DOS PRODUTOS INCLUIDOS NA ORDEM
    const totalPrice = ORDER_QUANTITY * product.PRODUCT_PRICE;
    const updatedSalePrice = parseFloat(sale.SALE_PRICE) + parseFloat(totalPrice);
    await schemaSale.update({ SALE_PRICE: updatedSalePrice }, { where: { SALE_ID: FK_SALE_ID } });

    //RETORNA O RESULTADO
    res.status(201).json(order);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This order could not be created due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;