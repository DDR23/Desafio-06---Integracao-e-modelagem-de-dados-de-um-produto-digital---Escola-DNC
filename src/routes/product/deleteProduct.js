//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaProduct = require('../../schemas/schemaProduct');
const schemaInventory = require('../../schemas/schemaInventory');

//REQUISIÇÃO HTTP
router.delete('/delete/:id', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE O PRODUTO EXISTE
    const product = await schemaProduct.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({
        error: 'Product not found',
        message: `That product you're looking for doesn't exist in the database.`,
        code: 404
      });
    }

    //APAGA TODOS OS REGISTRO DESSE PRODUTO NA TABELA INVENTARIO, CASO EXISTA
    await schemaInventory.destroy({ where: { FK_PRODUCT_ID: req.params.id } });

    //EXECUTA O SOFT DELETE
    await product.update({ PRODUCT_DELETED: true });

    //RETORNA O RESULTADO
    res.status(200).json({
      message: 'Product deleted successfully',
      code: 200
    });

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This product could not be deleted due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;