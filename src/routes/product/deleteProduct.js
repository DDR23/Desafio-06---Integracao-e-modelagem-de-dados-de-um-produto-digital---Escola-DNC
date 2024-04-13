const express = require('express');
const router = express.Router();
const schemaProduct = require('../../schemas/schemaProduct');

router.delete('/delete/:id', async (req, res) => {
  try {
    const product = await schemaProduct.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({
        error: 'Product not found',
        message: `That product you're looking for doesn't exist in the database.`,
        code: 404
      });
    }
    await product.destroy();
    res.status(200).json({
      message: 'Product deleted successfully',
      code: 200
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This product could not be deleted due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;