const express = require('express');
const router = express.Router();
const schemaProduct = require('../../schemas/schemaProduct');

router.put('/edit/:id', async (req, res) => {
  try {
    const product = await schemaProduct.findByPk(req.params.id);
    if(!product){
      return res.status(404).json({
        error: 'Product not found',
        message: `That product you're looking for doesn't exist in the database.`,
        code: 404
      });
    }
    product.PRODUCT_NAME = req.body.PRODUCT_NAME
    product.PRODUCT_DESCRIPTION = req.body.PRODUCT_DESCRIPTION
    product.PRODUCT_PRICE = req.body.PRODUCT_PRICE
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    const productNotUnique = error.parent.sqlState
    if(productNotUnique){
      return res.status(409).json({
        error: 'This product already exists',
        message: 'There is already a product with that name in the database.',
        code: 409
      })
    }
    res.status(500).json({
      error: 'Internal server error',
      message: 'This product could not be edited due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;