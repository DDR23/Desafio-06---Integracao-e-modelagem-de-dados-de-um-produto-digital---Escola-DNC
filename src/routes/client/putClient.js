//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaClient = require('../../schemas/schemaClient');

//REQUISIÇÃO HTTP
router.put('/edit/:id', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE O CLIENTE EXISTE
    const client = await schemaClient.findByPk(req.params.id);
    if(!client){
      return res.status(404).json({
        error: 'Client not found',
        message: `That client you're looking for doesn't exist in the database.`,
        code: 404
      });
    }

    //ESSE RESPONSÁVEL POR EDITAR O 'CLIENT_USERNAME'
    //TORNA O CAMPO 'CLIENT_USERNAME' OPCIONAL E VERIFICA SE ALGUM VALOR FOI PASSADO
    const newClientUsername = req.body.CLIENT_USERNAME;
    if(newClientUsername) {
      //VERIFICA SE O VALOR PASSADO JA EXISTE NO BANCO E RETORNA ERRO
      const clientNotUnique = await schemaClient.findOne({ where: { CLIENT_USERNAME: newClientUsername } });
      if(clientNotUnique){
        return res.status(409).json({
          error: 'This client already exists',
          message: 'There is already a client with that name in the database.',
          code: 409
        });
      }
      //SALVA O NOVO VALOR
      client.CLIENT_USERNAME = newClientUsername;
    }

    //TORNA O CAMPO 'CLIENT_PASSWORD' OPCIONAL E EXECUTA CASO ALGUM VALOR SEJA RECEBIDO
    const password = req.body.CLIENT_PASSWORD;
    if(password) {
      client.CLIENT_PASSWORD = password;
    }

    //BLOCO RESPONSÁVEL POR DESFAZER O SOFT DELETE
    //TORNA O CAMPO 'CLIENT_DELETED' OPCIONAL E VERIFICA O VALOR RECEBIDO
    if(client.CLIENT_DELETED === true || client.CLIENT_DELETED === false) {
      const clientSoftDeleted = req.body.CLIENT_DELETED;
      //VERIFICA O TIPO DO VALOR RECEBIDO E RETORNA ERRO CASO NAO SEJA O TIPO ESPERADO
      if(clientSoftDeleted !== undefined && typeof clientSoftDeleted !== 'boolean') {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'CLIENT_DELETED needs to be a boolean.',
          code: 400
        });
      }
      //VERIFICA SE O VALOR É DIFERENTE DO ESPERADO E RETORNA ERRO 
      if(clientSoftDeleted === true) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'This operation cannot be performed as it requires the use of the HTTP DELETE method.',
          code: 400
        });
      }
      //SE O VALOR FOR O ESPERADO, SALVA E RETIRA O SOFT DELETE
      if(clientSoftDeleted === false) {
        client.CLIENT_DELETED = false;
      }
    }

    //EXECUTA O PUT
    await client.save();

    //RETORNA O RESULTADO
    res.status(200).json(client);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This client could not be edited due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;