const express = require('express');
const router = express.Router();
const schemaInventory = require('../../schemas/schemaInventory');

router.get('/', async (req, res) => {
  try {
    const inventory = await schemaInventory.findAll();
    res.status(200).json(inventory)
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: `The inventory list could not be retrieved due to an internal server error. Please try again later.`,
      code: 500
    })
  }
})

module.exports = router;