const StorageRepository = require('../../domain/repositories/StorageRepository');
const storage = require('../utils/cloud_storage');

class StorageRepositoryImpl extends StorageRepository {
  async upload(file, path, deletePathImage) {
    return storage(file, path, deletePathImage);
  }
}

module.exports = StorageRepositoryImpl;
