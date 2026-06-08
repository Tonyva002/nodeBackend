class ProductRepository {
  async create(product) {
    throw new Error('ProductRepository.create not implemented');
  }

  async update(product) {
    throw new Error('ProductRepository.update not implemented');
  }

  async findByCategory(id_category) {
    throw new Error('ProductRepository.findByCategory not implemented');
  }

  async delete(id) {
    throw new Error('ProductRepository.delete not implemented');
  }
}

module.exports = ProductRepository;
