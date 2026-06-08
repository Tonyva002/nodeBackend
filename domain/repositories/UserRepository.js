class UserRepository {
  async findByDelivery() {
    throw new Error('UserRepository.findByDelivery not implemented');
  }

  async findByEmail(email) {
    throw new Error('UserRepository.findByEmail not implemented');
  }

  async findById(id) {
    throw new Error('UserRepository.findById not implemented');
  }

  async create(user) {
    throw new Error('UserRepository.create not implemented');
  }

  async update(user) {
    throw new Error('UserRepository.update not implemented');
  }

  async updateWithoutImage(user) {
    throw new Error('UserRepository.updateWithoutImage not implemented');
  }
}

module.exports = UserRepository;
