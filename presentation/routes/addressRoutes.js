const addressController = require('../controllers/addressController');
const { authenticateJwt } = require('../middlewares/authMiddleware');

module.exports = (app) => {
  app.get(
    '/api/address/findAddressByUser/:id_user',
    authenticateJwt,
    addressController.findAddressByUser
  );

  app.post('/api/address/create', authenticateJwt, addressController.create);
};
