const express = require('express');
const router = express.Router();
const schemaClient = require('../../schemas/schemaClient');

router.post('/create', async (req, res) => {
  try {
    const { CLIENT_USERNAME, CLIENT_PASSWORD } = req.body;
    const newClient = await schemaClient.create({ CLIENT_USERNAME, CLIENT_PASSWORD });
    res.status(201).json(newClient);
  } catch (error) {
    console.log(error)
    const usernameNotUnique = error.parent.sqlState
    if (usernameNotUnique) {
      return res.status(409).json({
        error: 'This username already exists',
        message: 'There is already a username with that name in the database.',
        code: 409
      })
    }
    res.status(500).json({
      error: 'Internal server error',
      message: 'This client could not be created due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;