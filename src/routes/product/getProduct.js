//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaProduct = require('../../schemas/schemaProduct');

//REQUISIÇÃO HTTP
router.get('/', async (req, res) => {
  try {
    const products = await schemaProduct.findAll();
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: `The product list could not be retrieved due to an internal server error. Please try again later.`,
      code: 500
    })
  }
})

module.exports = router;