const express = require('express');
const router = express.Router();
const schemaClient = require('../../schemas/schemaClient');

router.delete('/delete/:id', async (req, res) => {
  try {
    const client = await schemaClient.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({
        error: 'Client not found',
        message: `That client you're looking for doesn't exist in the database.`,
        code: 404
      });
    }
    await client.destroy();
    res.status(200).json({
      message: 'CLient deleted successfully',
      code: 200
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This client could not be deleted due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;