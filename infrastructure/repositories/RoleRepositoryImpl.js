const RoleRepository = require('../../domain/repositories/RoleRepository');
const RolModel = require('../models/rol');
const { wrapModel } = require('./modelWrapper');

const rolModel = wrapModel(RolModel);

class RoleRepositoryImpl extends RoleRepository {
  async create(id_user, id_rol) {
    return rolModel.create(id_user, id_rol);
  }
}

module.exports = RoleRepositoryImpl;
