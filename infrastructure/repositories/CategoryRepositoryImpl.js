const CategoryRepository = require('../../domain/repositories/CategoryRepository');
const CategoryModel = require('../models/category');
const { wrapModel } = require('./modelWrapper');

const categoryModel = wrapModel(CategoryModel);

class CategoryRepositoryImpl extends CategoryRepository {
  async getAll() {
    return categoryModel.getAll();
  }

  async create(category) {
    return categoryModel.create(category);
  }

  async update(category) {
    return categoryModel.update(category);
  }

  async delete(id) {
    return categoryModel.delete(id);
  }
}

module.exports = CategoryRepositoryImpl;
