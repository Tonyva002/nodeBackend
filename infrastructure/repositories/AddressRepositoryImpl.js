const AddressRepository = require('../../domain/repositories/AddressRepository');
const AddressModel = require('../models/address');
const { wrapModel } = require('./modelWrapper');

const addressModel = wrapModel(AddressModel);

class AddressRepositoryImpl extends AddressRepository {
  async findAddressByUser(id_user) {
    return addressModel.findAddressByUser(id_user);
  }

  async create(address) {
    return addressModel.create(address);
  }

  async delete(id) {
    return addressModel.delete(id);
  }
}

module.exports = AddressRepositoryImpl;
