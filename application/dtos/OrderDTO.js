class OrderDTO {
  constructor({ id, id_customer, id_address, id_delivery, status, timestamp, products }) {
    this.id = id;
    this.id_customer = id_customer;
    this.id_address = id_address;
    this.id_delivery = id_delivery;
    this.status = status;
    this.timestamp = timestamp;
    this.products = products;
  }

  static fromRequest(body) {
    return new OrderDTO({
      id: body.id,
      id_customer: body.id_customer,
      id_address: body.id_address,
      id_delivery: body.id_delivery,
      status: body.status,
      timestamp: body.timestamp,
      products: body.products,
    });
  }
}

module.exports = OrderDTO;
