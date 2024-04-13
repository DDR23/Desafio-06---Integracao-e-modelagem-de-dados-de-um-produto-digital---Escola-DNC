const express = require('express');
const router = express.Router();

router.get('', async (req, res) => {
  try {
    res.status(200).send(`
      <p>Rotas disponíveis:</p>
      <ul>
        <li><a href="/product">/product</a></li>
      </ul>
    `);
    
  } catch (error) {
    res.status(500).send('Estamos enfrentando algum problema');
  }
});

module.exports = router;