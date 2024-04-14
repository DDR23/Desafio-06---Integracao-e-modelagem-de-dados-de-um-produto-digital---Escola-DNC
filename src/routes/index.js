const express = require('express');
const router = express.Router();

router.get('', async (req, res) => {
  try {
    res.status(200).send(`
      <p>Rotas disponíveis:</p>
      <ul>
        <li><a href="/product">/product</a></li>
        <li><a href="/inventory">/inventory</a></li>
        <li><a href="/client">/client</a></li>
        <li><a href="/sale">/sale</a></li>
      </ul>
    `);
    
  } catch (error) {
    res.status(500).send('Estamos enfrentando algum problema');
  }
});

module.exports = router;