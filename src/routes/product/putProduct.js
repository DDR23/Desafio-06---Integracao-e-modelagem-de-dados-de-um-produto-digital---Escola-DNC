//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaProduct = require('../../schemas/schemaProduct');

//REQUISIÇÃO HTTP
router.put('/edit/:id', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE O PRODUTO EXISTE
    const product = await schemaProduct.findByPk(req.params.id);
    if(!product){
      return res.status(404).json({
        error: 'Product not found',
        message: `That product you're looking for doesn't exist in the database.`,
        code: 404
      });
    }

    //ESSE RESPONSÁVEL POR EDITAR O 'PRODUCT_NAME'
    //TORNA O CAMPO 'PRODUCT_NAME' OPCIONAL E SE ALGUM VALOR FOI PASSADO
    const newProductName = req.body.PRODUCT_NAME;
    if(newProductName) {
      //VERIFICA SE O VALOR PASSADO JA EXISTE NO BANCO E RETORNA ERRO
      const productNotUnique = await schemaProduct.findOne({ where: { PRODUCT_NAME: newProductName } });
      if(productNotUnique){
        return res.status(409).json({
          error: 'This product already exists',
          message: 'There is already a product with that name in the database.',
          code: 409
        });
      }
      //SALVA O NOVO VALOR
      product.PRODUCT_NAME = newProductName;
    }

    //TORNA O CAMPO 'PRODUCT_PRICE' OPCIONAL E EXECUTA CASO ALGUM VALOR SEJA RECEBIDO
    const productPrice = parseFloat(req.body.PRODUCT_PRICE);
    if(productPrice) {
      product.PRODUCT_PRICE = productPrice;
    }

    //SALVA O VALOR DO CAMPO 'PRODUCT_DESCRIPTION', NÃO PRECISA DE IF, NO SCHEMAPRODUCT ESSA COLUNA É DEFINIDA COMO 'ALLOWNULL: TRUE'
    product.PRODUCT_DESCRIPTION = req.body.PRODUCT_DESCRIPTION;

    //BLOCO RESPONSÁVEL POR DESFAZER O SOFT DELETE
    //TORNA O CAMPO 'CLIENT_DELETED' OPCIONAL E VERIFICA O VALOR RECEBIDO
    if( product.PRODUCT_DELETED === true || product.PRODUCT_DELETED === false ) {
      const productSoftDeleted = req.body.PRODUCT_DELETED;
      //VERIFICA O TIPO DO VALOR RECEBIDO E RETORNA ERRO CASO NAO SEJA O TIPO ESPERADO
      if(productSoftDeleted !== undefined && typeof productSoftDeleted !== 'boolean') {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'PRODUCT_DELETED needs to be a boolean.',
          code: 400
        });
      }
      //VERIFICA SE O VALOR É DIFERENTE DO ESPERADO E RETORNA ERRO 
      if(productSoftDeleted === true) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'This operation cannot be performed as it requires the use of the HTTP DELETE method.',
          code: 400
        });
      }
      //SE O VALOR FOR O ESPERADO, SALVA E RETIRA O SOFT DELETE
      if(productSoftDeleted === false) {
        product.PRODUCT_DELETED = false;
      }
    }

    //EXECUTA O PUT
    await product.save();

    //RETORNA O RESULTADO
    res.status(200).json(product);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This product could not be edited due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;