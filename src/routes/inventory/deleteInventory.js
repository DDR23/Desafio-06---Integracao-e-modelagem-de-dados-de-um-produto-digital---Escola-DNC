const express = require('express');
const router = express.Router();
const schemaInventory = require('../../schemas/schemaInventory');

router.delete('/delete/:id', async (req, res) => {
  try {
    const inventory = await schemaInventory.findByPk(req.params.id);
    if (!inventory) {
      return res.status(404).json({
        error: 'Inventory not found',
        message: `That inventory you're looking for doesn't exist in the database.`,
        code: 404
      });
    }
    await inventory.destroy();
    res.status(200).json({
      message: 'Inventory deleted successfully',
      code: 200
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This inventory could not be deleted due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;