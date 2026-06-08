const usersController = require('../controllers/usersController');
const { authenticateJwt } = require('../middlewares/authMiddleware');

module.exports = (app, upload) => {
  app.post('/api/users/create', usersController.register);
  app.post('/api/users/createWithImage', upload.array('image', 1), usersController.registerWithImage);
  app.post('/api/users/login', usersController.login);

  app.get('/api/users/findByDelivery', authenticateJwt, usersController.findByDelivery);

  app.put(
    '/api/users/updateWithImage',
    authenticateJwt,
    upload.array('image', 1),
    usersController.updateWithImage
  );
  app.put('/api/users/updateWithoutImage', authenticateJwt, usersController.updateWithoutImage);
};
