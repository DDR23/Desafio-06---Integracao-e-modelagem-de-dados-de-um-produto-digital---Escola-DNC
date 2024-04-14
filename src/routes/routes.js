function routes(app) {
  //HOME
  app.use('/', require('./index'));

  //PRODUCTS
  app.use('/product', require('./product/postProduct'))
  app.use('/product', require('./product/getProduct'))
  app.use('/product', require('./product/getOneProduct'))
  app.use('/product', require('./product/putProduct'))
  app.use('/product', require('./product/deleteProduct'))

  //INVENTORY
  app.use('/inventory', require('./inventory/postInventory'))
  app.use('/inventory', require('./inventory/getInventory'))
  app.use('/inventory', require('./inventory/getOneInventory'))
  app.use('/inventory', require('./inventory/putInventory'))
  app.use('/inventory', require('./inventory/deleteInventory'))
}

module.exports = routes;