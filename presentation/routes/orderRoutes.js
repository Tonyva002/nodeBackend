const ordersController = require('../controllers/ordersController');
const { authenticateJwt } = require('../middlewares/authMiddleware');

module.exports = (app, upload) => {
  app.get('/api/orders/findByStatus/:status', authenticateJwt, ordersController.findByStatus);
  app.get(
    '/api/orders/findByDeliveryAndStatus/:id_delivery/:status',
    authenticateJwt,
    ordersController.findByDeliveryAndStatus
  );
  app.post('/api/orders/create', authenticateJwt, ordersController.create);
  app.put('/api/orders/updateToDispatched', authenticateJwt, ordersController.updateToDispatched);
  app.put('/api/orders/updateToOnTheWay', authenticateJwt, ordersController.updateToOnTheWay);
  app.put('/api/orders/updateToDelivered', authenticateJwt, ordersController.updateToDelivered);
};
       