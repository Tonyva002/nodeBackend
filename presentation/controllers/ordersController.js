const { orderUseCases } = require('../usecases');
const OrderDTO = require('../../application/dtos/OrderDTO');

function sendError(res, err) {
  const status = err.status || 500;
  return res.status(status).json({
    success: false,
    message: err.message || 'Internal server error',
    error: err.error || err,
  });
}

module.exports = {
  async findByStatus(req, res) {
    try {
      const data = await orderUseCases.findByStatus(req.params.status);
      return res.status(200).json(data);
    } catch (err) {
      return sendError(res, err);
    }
  },

  async findByDeliveryAndStatus(req, res) {
    try {
      const data = await orderUseCases.findByDeliveryAndStatus(
        req.params.id_delivery,
        req.params.status
      );
      return res.status(200).json(data);
    } catch (err) {
      return sendError(res, err);
    }
  },

  async create(req, res) {
    try {
      const orderDto = OrderDTO.fromRequest(req.body);
      const result = await orderUseCases.create(orderDto);
      return res.status(200).json({
        success: true,
        message: 'La orden se creó correctamente',
        data: result.id_order,
      });
    } catch (err) {
      return sendError(res, err);
    }
  },

  async updateToDispatched(req, res) {
    try {
      const orderDto = OrderDTO.fromRequest(req.body);
      const id_order = await orderUseCases.updateToDispatched(orderDto);
      return res.status(200).json({
        success: true,
        message: 'La orden se actualizo correctamente',
        data: `${id_order}`,
      });
    } catch (err) {
      return sendError(res, err);
    }
  },

  async updateToOnTheWay(req, res) {
    try {
      const orderDto = OrderDTO.fromRequest(req.body);
      const id_order = await orderUseCases.updateToOnTheWay(orderDto);
      return res.status(200).json({
        success: true,
        message: 'La orden se actualizo correctamente',
        data: `${id_order}`,
      });
    } catch (err) {
      return sendError(res, err);
    }
  },

  async updateToDelivered(req, res) {
    try {
      const orderDto = OrderDTO.fromRequest(req.body);
      const id_order = await orderUseCases.updateToDelivered(orderDto);
      return res.status(200).json({
        success: true,
        message: 'La orden se actualizo correctamente',
        data: `${id_order}`,
      });
    } catch (err) {
      return sendError(res, err);
    }
  },
};
