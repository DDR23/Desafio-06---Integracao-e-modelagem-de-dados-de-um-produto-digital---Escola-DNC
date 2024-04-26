//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaSale = require('../../schemas/schemaSale');
const schemaOrder = require('../../schemas/schemaOrder');
const schemaInventory = require('../../schemas/schemaInventory');

//REQUISIÇÃO HTTP
router.delete('/delete/:id', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE A VENDA EXISTE
    const sale = await schemaSale.findByPk(req.params.id);
    if (!sale) {
      return res.status(404).json({
        error: 'Sale not found',
        message: `That sale you're looking for doesn't exist in the database.`,
        code: 404
      });
    }

    //ESSE BLOCO É RESPONSÁVEL PELO ESTORNO
    //PROCURA TODAS AS ORDENS DA TABELA ORDEM PERTENCENTES A ESSA VENDA
    const orders = await schemaOrder.findAll({ where: { FK_SALE_ID: req.params.id } });
    //PARA CADA ORDEM ENCONTRADA, VERIFICA SE EXISTE UM INVENTARIO DO PRODUTO
    for (let order of orders) {
      const inventory = await schemaInventory.findOne({ where: { FK_PRODUCT_ID: order.FK_PRODUCT_ID } });
      //EXISTINDO INVENTARIO, SOMA A QUANTIDADE DA ORDEM COM A QUANTIDADE DO INVENTARIO
      if (inventory) {
        const updatedQuantity = inventory.INVENTORY_QUANTITY + order.ORDER_QUANTITY;

        //ATUALIZA A QUANTIDADE DO PRODUTO NO INVENTARIO
        await schemaInventory.update({ INVENTORY_QUANTITY: updatedQuantity }, { where: { FK_PRODUCT_ID: order.FK_PRODUCT_ID } });
      }
    }

    //DELETE TODOS OS REGISTROS DA TABELA ORDEM QUE FAZ REFERECIA A ESSA VENDA
    await schemaOrder.destroy({ where: { FK_SALE_ID: req.params.id } });

    //EXECUTA O DELETE
    await sale.destroy();

    //RETORNA O RESULTADO
    res.status(200).json({
      message: 'Sale deleted successfully.',
      code: 200
    });

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This sale could not be deleted due to an internal server error. Please try again later.',
      code: 500
    });
  }
});
 
module.exports = router;