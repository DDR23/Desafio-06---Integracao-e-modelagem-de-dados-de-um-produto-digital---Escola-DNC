//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaProduct = require('../../schemas/schemaProduct');

//REQUISIÇÃO HTTP
router.post('/create', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //GUARDA O CONTEÚDO QUE VEM DO BODY
    let { PRODUCT_NAME, PRODUCT_DESCRIPTION, PRODUCT_PRICE } = req.body;

    //VERIFICA SE JÁ EXISTE ALGUM PRODUTO COM O NOME PASSADO NO 'PRODUCT_NAME'
    const productNameNotUnique = await schemaProduct.findOne({ where: { PRODUCT_NAME } });
    if (productNameNotUnique) {
      return res.status(409).json({
        error: 'This product already exists',
        message: 'A product with that name already exists in the database. If you cannot see this product, remove the soft delete filter.',
        code: 409
      });
    }

    //VERIFICA O TIPO DO VALOR, CASO NAO SEJA O TIPO ESPERADO RETORNA ERRO
    PRODUCT_PRICE = parseFloat(PRODUCT_PRICE);
    if(isNaN(PRODUCT_PRICE)) {
      return res.status(400).json({
        error: 'Bad request',
        message: 'PRODUCT_PRICE must be a number.',
        code: 400
      });
    }

    //EXECUTA O POST
    const newProduct = await schemaProduct.create({ PRODUCT_NAME, PRODUCT_DESCRIPTION, PRODUCT_PRICE });

    //RETORNA O RESULTADO
    res.status(201).json(newProduct);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This product could not be created due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;