//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const path = require('path');

//REQUISIÇÃO HTTP
router.get('', async (req, res) => {

  //EXECUTA ESSE BLOCO AO BATER NA ROTA
  try {
    
    //RETORNA O CONTEUDO DO INDEX.HTML
    res.sendFile(path.join(__dirname, '..','..', 'public', 'index.html'));

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: `Oops! We've hit a snag. Our server is experiencing a momentary hiccup. We'll be back on track shortly!`,
      code: 500
    });
  }
});

module.exports = router;