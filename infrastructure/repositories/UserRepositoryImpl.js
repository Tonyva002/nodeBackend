const UserRepository = require('../../domain/repositories/UserRepository');
const UserModel = require('../models/user');
const { wrapModel } = require('./modelWrapper');

const userModel = wrapModel(UserModel);

class UserRepositoryImpl extends UserRepository {
  async findByDelivery() {
    return userModel.findByDelivery();
  }

  async findByEmail(email) {
    return userModel.findByEmail(email);
  }

  async findById(id) {
    return userModel.findById(id);
  }

  async create(user) {
    return userModel.create(user);
  }

  async update(user) {
    return userModel.update(user);
  }

  async updateWithoutImage(user) {
    return userModel.updateWithoutImage(user);
  }
}

module.exports = UserRepositoryImpl;
