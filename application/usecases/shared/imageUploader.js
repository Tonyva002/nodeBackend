const { ensureRepository } = require('./validation');
const StorageRepository = require('../../../domain/repositories/StorageRepository');

function createImageUploader(storageRepository) {
  function ensureStorageRepo() {
    ensureRepository(storageRepository, 'StorageRepository');
  }

  async function uploadImageIfExists(files) {
    if (!files || files.length === 0) {
      return null;
    }

    ensureStorageRepo();
    const path = `image_${Date.now()}`;
    return storageRepository.upload(files[0], path);
  }

  async function uploadProductImages(productDto, files) {
    if (!files || files.length === 0) {
      return productDto;
    }

    ensureStorageRepo();
    const timestamp = Date.now();
    for (let i = 0; i < files.length; i++) {
      const path = `image_${timestamp}_${i}`;
      const url = await storageRepository.upload(files[i], path);
      if (!url) {
        continue;
      }
      if (i === 0) productDto.image1 = url;
      else if (i === 1) productDto.image2 = url;
      else if (i === 2) productDto.image3 = url;
    }

    return productDto;
  }

  return {
    uploadImageIfExists,
    uploadProductImages,
  };
}

module.exports = {
  createImageUploader,
};
