//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaClient = require('../../schemas/schemaClient');

//REQUISIÇÃO HTTP
router.delete('/delete/:id', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {
    
    //VERIFICA SE O CLIENTE EXISTE
    const client = await schemaClient.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({
        error: 'Client not found',
        message: `That client you're looking for doesn't exist in the database.`,
        code: 404
      });
    };

    //EXECUTA O SOFT DELETE
    await client.update({ CLIENT_DELETED: true });

    //RETORNA O RESULTADO
    res.status(200).json({
      message: 'CLient deleted successfully',
      code: 200
    });

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This client could not be deleted due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;