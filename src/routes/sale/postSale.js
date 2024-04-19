//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaSale = require('../../schemas/schemaSale');
const schemaClient = require('../../schemas/schemaClient');

//REQUISIÇÃO HTTP
router.post('/create', async (req, res) => {
  try {
    const { SALE_PRICE, FK_CLIENT_ID } = req.body;
    const client = await schemaClient.findByPk(FK_CLIENT_ID);
    if (!client) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'The client does not exist.',
        code: 400
      });
    }
    const newSale = await schemaSale.create({ SALE_PRICE, FK_CLIENT_ID });
    res.status(201).json(newSale);
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'Internal server error',
      message: 'This sale could not be created due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;