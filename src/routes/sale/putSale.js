const express = require('express');
const router = express.Router();
const schemaSale = require('../../schemas/schemaSale');
const schemaClient = require('../../schemas/schemaClient');

router.put('/edit/:id', async (req, res) => {
  try {
    const sale = await schemaSale.findByPk(req.params.id);
    if(!sale){
      res.status(404).json({
        error: 'Sale not found',
        message: `That sale you're looking for doesn't exist in the database.`,
        code: 404
      });
    }
    const client = await schemaClient.findByPk(req.body.FK_CLIENT_ID);
    if (!client) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'The client does not exist.',
        code: 400
      });
    }
    client.SALE_DATE = req.body.SALE_DATE
    client.FK_CLIENT_ID = req.body.FK_CLIENT_ID
    await sale.save();
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This sale could not be edited due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;