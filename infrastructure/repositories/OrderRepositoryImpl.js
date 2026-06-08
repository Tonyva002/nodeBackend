const OrderRepository = require('../../domain/repositories/OrderRepository');
const OrderModel = require('../models/order');
const OrderHasProductModel = require('../models/order_has_product');
const { wrapModel } = require('./modelWrapper');

const orderModel = wrapModel(OrderModel);
const orderHasProductModel = wrapModel(OrderHasProductModel);

class OrderRepositoryImpl extends OrderRepository {
  async findByStatus(status) {
    return orderModel.findByStatus(status);
  }

  async findByDeliveryAndStatus(id_delivery, status) {
    return orderModel.findByDeliveryAndStatus(id_delivery, status);
  }

  async create(order) {
    const id_order = await orderModel.create(order);
    if (Array.isArray(order.products)) {
      for (const product of order.products) {
        await orderHasProductModel.create(id_order, product.id, product.quantity);
      }
    }
    return id_order;
  }

  async updateToDispatched(order) {
    return orderModel.updateToDispatched(order.id, order.id_delivery);
  }

  async updateToOnTheWay(order) {
    return orderModel.updateToOnTheWay(order.id, order.id_delivery);
  }

  async updateToDelivered(order) {
    return orderModel.updateToDelivered(order.id, order.id_delivery);
  }
}

module.exports = OrderRepositoryImpl;
