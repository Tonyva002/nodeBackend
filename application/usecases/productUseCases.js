const ProductRepository = require('../../domain/repositories/ProductRepository');
const ProductDTO = require('../dtos/ProductDTO');
const {
  requiredPayload,
  requiredId,
  ensureRepository,
} = require('./shared/validation');
const { createImageUploader } = require('./shared/imageUploader');

function createProductUseCases({ productRepository, storageRepository }) {
  ensureRepository(productRepository, 'ProductRepository');

  const { uploadImageIfExists, uploadProductImages } = createImageUploader(storageRepository);

  function ensureProductRepo() {
    ensureRepository(productRepository, 'ProductRepository');
  }

  async function findByCategory(id_category) {
    requiredId(id_category, 'Category ID');

    ensureProductRepo();
    return productRepository.findByCategory(id_category);
  }

  async function create(productDto, files) {
    requiredPayload(productDto, 'Product payload');
    if (!files || files.length === 0) {
      const error = new Error('Product images are required');
      error.status = 400;
      throw error;
    }

    ensureProductRepo();
    const id_product = await productRepository.create(productDto);
    productDto.id = id_product;
    await uploadProductImages(productDto, files);
    const result = await productRepository.update(productDto);
    return result;
  }

  async function update(productDto, files) {
    requiredId(productDto?.id, 'Product ID');

    if (files && files.length > 0) {
      const url = await uploadImageIfExists(files);
      if (url) {
        productDto.image = url;
      }
    }

    ensureProductRepo();
    const id = await productRepository.update(productDto);
    return { id };
  }

  async function updateWithImage(productDto, files) {
    return update(productDto, files);
  }

  async function updateWithoutImage(productDto) {
    return update(productDto);
  }

  async function remove(id) {
    requiredId(id, 'Product ID');

    ensureProductRepo();
    await productRepository.delete(id);
    return { id };
  }

  return {
    findByCategory,
    create,
    updateWithImage,
    updateWithoutImage,
    remove,
    createProductDTO: ProductDTO.fromRequest,
  };
}

module.exports = createProductUseCases;
