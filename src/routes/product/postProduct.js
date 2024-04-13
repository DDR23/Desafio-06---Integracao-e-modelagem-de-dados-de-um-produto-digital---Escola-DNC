const express = require('express');
const router = express.Router();
const schemaProduct = require('../../schemas/schemaProduct');

router.post('/create', async (req, res) => {
  try {
    const { PRODUCT_NAME, PRODUCT_DESCRIPTION, PRODUCT_PRICE } = req.body;
    const newProduct = await schemaProduct.create({ PRODUCT_NAME, PRODUCT_DESCRIPTION, PRODUCT_PRICE });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This product could not be created due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;