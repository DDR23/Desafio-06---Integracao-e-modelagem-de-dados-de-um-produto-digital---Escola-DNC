//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaSale = require('../../schemas/schemaSale');

//REQUISIÇÃO HTTP
router.get('/:id', async (req, res) => {
  try {
    const sale = await schemaSale.findByPk(req.params.id);
    if(!sale){
      return res.status(404).json({
        error: 'Sale not found',
        messege: `That sale you're looking for doesn't exist in the database.`,
        code: 404
      });
    }
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'Unable to obtain this sale due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router; 