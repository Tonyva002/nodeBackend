const OrderRepository = require('../../domain/repositories/OrderRepository');
const OrderDTO = require('../dtos/OrderDTO');
const {
  requiredPayload,
  requiredId,
  ensureRepository,
} = require('./shared/validation');

function createOrderUseCases({ orderRepository }) {
  ensureRepository(orderRepository, 'OrderRepository');

  function ensureOrderRepo() {
    ensureRepository(orderRepository, 'OrderRepository');
  }

  async function findByStatus(status) {
    requiredId(status, 'Order status');

    ensureOrderRepo();
    return orderRepository.findByStatus(status);
  }

  async function findByDeliveryAndStatus(id_delivery, status) {
    requiredId(id_delivery, 'Delivery ID');
    requiredId(status, 'Order status');

    ensureOrderRepo();
    return orderRepository.findByDeliveryAndStatus(id_delivery, status);
  }

  async function create(orderDto) {
    requiredPayload(orderDto, 'Order payload');
    const { id_customer, id_address, products } = orderDto;
    requiredId(id_customer, 'Customer ID');
    requiredId(id_address, 'Address ID');
    if (!Array.isArray(products) || products.length === 0) {
      const error = new Error('Products are required');
      error.status = 400;
      throw error;
    }

    for (const product of products) {
      requiredId(product?.id, 'Product ID');
      requiredId(product?.quantity, 'Product quantity');
    }

    ensureOrderRepo();
    return orderRepository.create(orderDto);
  }

  async function updateStatus(orderDto, method) {
    requiredId(orderDto?.id, 'Order ID');
    requiredId(orderDto?.id_delivery, 'Delivery ID');

    ensureOrderRepo();
    return orderRepository[method](orderDto);
  }

  async function updateToDispatched(orderDto) {
    return updateStatus(orderDto, 'updateToDispatched');
  }

  async function updateToOnTheWay(orderDto) {
    return updateStatus(orderDto, 'updateToOnTheWay');
  }

  async function updateToDelivered(orderDto) {
    return updateStatus(orderDto, 'updateToDelivered');
  }

  return {
    findByStatus,
    findByDeliveryAndStatus,
    create,
    updateToDispatched,
    updateToOnTheWay,
    updateToDelivered,
    createOrderDTO: OrderDTO.fromRequest,
  };
}

module.exports = createOrderUseCases;
