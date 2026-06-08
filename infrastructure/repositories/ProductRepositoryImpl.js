const ProductRepository = require('../../domain/repositories/ProductRepository');
const ProductModel = require('../models/product');
const { wrapModel } = require('./modelWrapper');

const productModel = wrapModel(ProductModel);

class ProductRepositoryImpl extends ProductRepository {
  async create(product) {
    return productModel.create(product);
  }

  async update(product) {
    return productModel.update(product);
  }

  async findByCategory(id_category) {
    return productModel.findByCategory(id_category);
  }

  async delete(id) {
    return productModel.delete(id);
  }
}

module.exports = ProductRepositoryImpl;
