class Order {
  constructor({ id, id_customer, id_address, id_delivery, status, timestamp }) {
    this.id = id;
    this.id_customer = id_customer;
    this.id_address = id_address;
    this.id_delivery = id_delivery;
    this.status = status;
    this.timestamp = timestamp;
  }
}

module.exports = Order;
