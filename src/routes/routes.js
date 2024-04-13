function routes(app) {
  //HOME
  app.use('/', require('./index'));

  //PRODUCTS
  app.use('/product', require('./product/postProduct'))
  app.use('/product', require('./product/getProduct'))
  app.use('/product', require('./product/getOneProduct'))
  app.use('/product', require('./product/putProduct'))
  app.use('/product', require('./product/deleteProduct'))
}

module.exports = routes;