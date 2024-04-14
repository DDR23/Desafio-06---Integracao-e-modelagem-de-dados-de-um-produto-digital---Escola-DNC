const express = require('express');
const router = express.Router();
const schemaInventory = require('../../schemas/schemaInventory');
const schemaProduct = require('../../schemas/schemaProduct');

router.put('/edit/:id', async (req, res) => {
  try {
    const inventory = await schemaInventory.findByPk(req.params.id);
    if(!inventory){
      res.status(404).json({
        error: 'Inventory not found',
        message: `That inventory you're looking for doesn't exist in the database.`,
        code: 404
      });
    }
    const product = await schemaProduct.findByPk(req.body.FK_PRODUCT_ID);
    if (!product) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'The product does not exist.',
        code: 400
      });
    }
    inventory.INVENTORY_QUANTITY = req.body.INVENTORY_QUANTITY
    inventory.FK_PRODUCT_ID = req.body.FK_PRODUCT_ID
    await inventory.save();
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This inventory could not be edited due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;