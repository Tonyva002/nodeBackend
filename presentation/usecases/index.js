const UserRepositoryImpl = require('../../infrastructure/repositories/UserRepositoryImpl');
const RoleRepositoryImpl = require('../../infrastructure/repositories/RoleRepositoryImpl');
const CategoryRepositoryImpl = require('../../infrastructure/repositories/CategoryRepositoryImpl');
const ProductRepositoryImpl = require('../../infrastructure/repositories/ProductRepositoryImpl');
const OrderRepositoryImpl = require('../../infrastructure/repositories/OrderRepositoryImpl');
const AddressRepositoryImpl = require('../../infrastructure/repositories/AddressRepositoryImpl');
const StorageRepositoryImpl = require('../../infrastructure/repositories/StorageRepositoryImpl');
const JwtServiceImpl = require('../../infrastructure/services/JwtServiceImpl');

const createUserUseCases = require('../../application/usecases/userUseCases');
const createCategoryUseCases = require('../../application/usecases/categoryUseCases');
const createProductUseCases = require('../../application/usecases/productUseCases');
const createOrderUseCases = require('../../application/usecases/orderUseCases');
const createAddressUseCases = require('../../application/usecases/addressUseCases');

const storageRepository = new StorageRepositoryImpl();

const userUseCases = createUserUseCases({
  userRepository: new UserRepositoryImpl(),
  roleRepository: new RoleRepositoryImpl(),
  jwtService: new JwtServiceImpl(),
  storageRepository,
});

const categoryUseCases = createCategoryUseCases({
  categoryRepository: new CategoryRepositoryImpl(),
  storageRepository,
});

const productUseCases = createProductUseCases({
  productRepository: new ProductRepositoryImpl(),
  storageRepository,
});

const orderUseCases = createOrderUseCases({
  orderRepository: new OrderRepositoryImpl(),
});

const addressUseCases = createAddressUseCases({
  addressRepository: new AddressRepositoryImpl(),
});

module.exports = {
  userUseCases,
  categoryUseCases,
  productUseCases,
  orderUseCases,
  addressUseCases,
};
