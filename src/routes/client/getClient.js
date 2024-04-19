//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaClient = require('../../schemas/schemaClient');

//REQUISIÇÃO HTTP
router.get('/', async (req, res) => {
  try {
    const client = await schemaClient.findAll();
    res.status(200).json(client)
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: `The client list could not be retrieved due to an internal server error. Please try again later.`,
      code: 500
    })
  }
})

module.exports = router;