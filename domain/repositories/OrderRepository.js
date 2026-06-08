class OrderRepository {
  async findByStatus(status) {
    throw new Error('OrderRepository.findByStatus not implemented');
  }

  async findByDeliveryAndStatus(id_delivery, status) {
    throw new Error('OrderRepository.findByDeliveryAndStatus not implemented');
  }

  async create(order) {
    throw new Error('OrderRepository.create not implemented');
  }

  async updateToDispatched(order) {
    throw new Error('OrderRepository.updateToDispatched not implemented');
  }

  async updateToOnTheWay(order) {
    throw new Error('OrderRepository.updateToOnTheWay not implemented');
  }

  async updateToDelivered(order) {
    throw new Error('OrderRepository.updateToDelivered not implemented');
  }
}

module.exports = OrderRepository;
