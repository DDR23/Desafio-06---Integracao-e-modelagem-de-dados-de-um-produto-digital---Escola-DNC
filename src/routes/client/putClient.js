const express = require('express');
const router = express.Router();
const schemaClient = require('../../schemas/schemaClient');

router.put('/edit/:id', async (req, res) => {
  try {
    const client = await schemaClient.findByPk(req.params.id);
    if(!client){
      return res.status(404).json({
        error: 'Client not found',
        message: `That client you're looking for doesn't exist in the database.`,
        code: 404
      });
    }
    client.CLIENT_USERNAME = req.body.CLIENT_USERNAME
    client.CLIENT_PASSWORD = req.body.CLIENT_PASSWORD
    await client.save();
    res.status(200).json(client);
    
  } catch (error) {
    const clientNotUnique = error.parent.sqlState
    if(clientNotUnique){
      return res.status(409).json({
        error: 'This client already exists',
        message: 'There is already a client with that name in the database.',
        code: 409
      })
    }
    res.status(500).json({
      error: 'Internal server error',
      message: 'This client could not be edited due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;