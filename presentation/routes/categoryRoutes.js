const categoriesController = require('../controllers/categoriesController');
const { authenticateJwt } = require('../middlewares/authMiddleware');

module.exports = (app, upload) => {
  app.get('/api/categories/getAll', authenticateJwt, categoriesController.getAll);
  app.post(
    '/api/categories/create',
    authenticateJwt,
    upload.array('image', 1),
    categoriesController.create
  );
  app.put(
    '/api/categories/updateWithImage',
    authenticateJwt,
    upload.array('image', 1),
    categoriesController.updateWithImage
  );
  app.put('/api/categories/updateWithoutImage', authenticateJwt, categoriesController.updateWithoutImage);
  app.delete('/api/categories/delete/:id', authenticateJwt, categoriesController.delete);
};
