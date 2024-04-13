const express = require('express');
const router = express.Router();
const schemaProduct = require('../../schemas/schemaProduct');

router.get('/:id', async (req, res) => {
  try {
    const product = await schemaProduct.findByPk(req.params.id);
    if(!product){
      return res.status(404).json({
        error: 'Product not found',
        messege: `That product you're looking for doesn't exist in the database.`,
        code: 404
      });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'Unable to obtain this product due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router; 