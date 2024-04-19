//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaClient = require('../../schemas/schemaClient');

//REQUISIÇÃO HTTP
router.get('/:id', async (req, res) => {
  try {
    const client = await schemaClient.findByPk(req.params.id);
    if(!client){
      return res.status(404).json({
        error: 'CLient not found',
        messege: `That client you're looking for doesn't exist in the database.`,
        code: 404
      });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'Unable to obtain this client due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router; 