class AddressDTO {
  constructor({ id, id_user, address, neighborhood, lat, lng }) {
    this.id = id;
    this.id_user = id_user;
    this.address = address;
    this.neighborhood = neighborhood;
    this.lat = lat;
    this.lng = lng;
  }

  static fromRequest(body) {
    return new AddressDTO({
      id: body.id,
      id_user: body.id_user,
      address: body.address,
      neighborhood: body.neighborhood,
      lat: body.lat,
      lng: body.lng,
    });
  }
}

module.exports = AddressDTO;
