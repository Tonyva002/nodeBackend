class Address {
  constructor({ id, id_user, address, neighborhood, lat, lng }) {
    this.id = id;
    this.id_user = id_user;
    this.address = address;
    this.neighborhood = neighborhood;
    this.lat = lat;
    this.lng = lng;
  }
}

module.exports = Address;
