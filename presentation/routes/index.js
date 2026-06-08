const userRoutes = require('./userRoutes');
const categoriesRoutes = require('./categoryRoutes');
const productsRoutes = require('./productRoutes');
const addressRoutes = require('./addressRoutes');
const ordersRoutes = require('./orderRoutes');

module.exports = (app, upload) => {
  userRoutes(app, upload);
  categoriesRoutes(app, upload);
  productsRoutes(app, upload);
  addressRoutes(app);
  ordersRoutes(app);
};
