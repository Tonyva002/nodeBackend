const productsController = require('../controllers/productController');
const { authenticateJwt } = require('../middlewares/authMiddleware');

module.exports = (app, upload) => {
  app.get('/api/products/findByCategory/:id_category', authenticateJwt, productsController.findByCategory);
  app.post(
    '/api/products/create',
    authenticateJwt,
    upload.array('image', 3),
    productsController.create
  );
  app.put(
    '/api/products/updateWithImage',
    authenticateJwt,
    upload.array('image', 3),
    productsController.updateWithImage
  );
  app.put('/api/products/updateWithoutImage', authenticateJwt, productsController.updateWithoutImage);
  app.delete('/api/products/delete/:id', authenticateJwt, productsController.delete);
};
