class AddressRepository {
  async findAddressByUser(id_user) {
    throw new Error('AddressRepository.findAddressByUser not implemented');
  }

  async create(address) {
    throw new Error('AddressRepository.create not implemented');
  }

  async delete(id) {
    throw new Error('AddressRepository.delete not implemented');
  }
}

module.exports = AddressRepository;
