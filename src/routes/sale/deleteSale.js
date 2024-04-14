const express = require('express');
const router = express.Router();
const schemaSale = require('../../schemas/schemaSale');

router.delete('/delete/:id', async (req, res) => {
  try {
    const sale = await schemaSale.findByPk(req.params.id);
    if (!sale) {
      return res.status(404).json({
        error: 'Sale not found',
        message: `That sale you're looking for doesn't exist in the database.`,
        code: 404
      });
    }
    await sale.destroy();
    res.status(200).json({
      message: 'Sale deleted successfully',
      code: 200
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This sale could not be deleted due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;