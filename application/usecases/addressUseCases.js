const AddressRepository = require('../../domain/repositories/AddressRepository');
const AddressDTO = require('../dtos/AddressDTO');
const {
  requiredPayload,
  requiredId,
  ensureRepository,
} = require('./shared/validation');

function createAddressUseCases({ addressRepository }) {
  ensureRepository(addressRepository, 'AddressRepository');

  function ensureAddressRepo() {
    ensureRepository(addressRepository, 'AddressRepository');
  }

  async function findAddressByUser(id_user) {
    requiredId(id_user, 'User ID');

    ensureAddressRepo();
    return addressRepository.findAddressByUser(id_user);
  }

  async function create(addressDto) {
    requiredPayload(addressDto, 'Address payload');

    ensureAddressRepo();
    const id = await addressRepository.create(addressDto);
    return { id };
  }

  async function remove(id) {
    requiredId(id, 'Address ID');

    ensureAddressRepo();
    await addressRepository.delete(id);
    return { id };
  }

  return {
    findAddressByUser,
    create,
    remove,
    createAddressDTO: AddressDTO.fromRequest,
  };
}

module.exports = createAddressUseCases;
