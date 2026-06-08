const CategoryRepository = require('../../domain/repositories/CategoryRepository');
const CategoryDTO = require('../dtos/CategoryDTO');
const {
  requiredPayload,
  requiredId,
  ensureRepository,
} = require('./shared/validation');
const { createImageUploader } = require('./shared/imageUploader');

function createCategoryUseCases({ categoryRepository, storageRepository }) {
  ensureRepository(categoryRepository, 'CategoryRepository');

  const { uploadImageIfExists } = createImageUploader(storageRepository);

  function ensureCategoryRepo() {
    ensureRepository(categoryRepository, 'CategoryRepository');
  }

  async function getAll() {
    ensureCategoryRepo();
    return categoryRepository.getAll();
  }

  async function create(categoryDto, files) {
    requiredPayload(categoryDto, 'Category payload');

    const url = await uploadImageIfExists(files);
    if (url) {
      categoryDto.image = url;
    }

    ensureCategoryRepo();
    const id = await categoryRepository.create(categoryDto);
    return { id };
  }

  async function update(categoryDto, files) {
    requiredId(categoryDto?.id, 'Category ID');

    const url = await uploadImageIfExists(files);
    if (url) {
      categoryDto.image = url;
    }

    ensureCategoryRepo();
    const id = await categoryRepository.update(categoryDto);
    return { id };
  }

  async function updateWithImage(categoryDto, files) {
    return update(categoryDto, files);
  }

  async function updateWithoutImage(categoryDto) {
    return update(categoryDto);
  }

  async function remove(id) {
    requiredId(id, 'Category ID');

    ensureCategoryRepo();
    await categoryRepository.delete(id);
    return { id };
  }

  return {
    getAll,
    create,
    updateWithImage,
    updateWithoutImage,
    remove,
    createCategoryDTO: CategoryDTO.fromRequest,
  };
}

module.exports = createCategoryUseCases;
