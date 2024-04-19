//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaSale = require('../../schemas/schemaSale');

//REQUISIÇÃO HTTP
router.get('/', async (req, res) => {
  try {
    const sale = await schemaSale.findAll();
    res.status(200).json(sale)
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: `The sale list could not be retrieved due to an internal server error. Please try again later.`,
      code: 500
    })
  }
})

module.exports = router;