//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaInventory = require('../../schemas/schemaInventory');
const schemaProduct = require('../../schemas/schemaProduct');

//REQUISIÇÃO HTTP
router.post('/create', async (req, res) => {
  try {
    const { INVENTORY_QUANTITY, FK_PRODUCT_ID } = req.body;
    const product = await schemaProduct.findByPk(FK_PRODUCT_ID);
    if (!product) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'The product does not exist.',
        code: 400
      });
    }
    let inventory = await schemaInventory.findOne({ where: { FK_PRODUCT_ID } });
    if (inventory) {
      inventory.INVENTORY_QUANTITY += +INVENTORY_QUANTITY;
      await inventory.save();
    } else {
      inventory = await schemaInventory.create({ INVENTORY_QUANTITY: +INVENTORY_QUANTITY, FK_PRODUCT_ID });
    }
    res.status(201).json(inventory);
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'Internal server error',
      message: 'This inventory could not be created due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;