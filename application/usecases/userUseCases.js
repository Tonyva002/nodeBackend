const bcrypt = require('bcryptjs');
const UserRepository = require('../../domain/repositories/UserRepository');
const RoleRepository = require('../../domain/repositories/RoleRepository');
const JwtService = require('../../domain/services/JwtService');
const UserDTO = require('../dtos/UserDTO');
const {
  requiredPayload,
  requiredId,
  ensureRepository,
} = require('./shared/validation');
const { createImageUploader } = require('./shared/imageUploader');

function createUserUseCases({ userRepository, roleRepository, jwtService, storageRepository }) {
  ensureRepository(userRepository, 'UserRepository');
  ensureRepository(roleRepository, 'RoleRepository');
  ensureRepository(jwtService, 'JwtService');

  const { uploadImageIfExists } = createImageUploader(storageRepository);

  function ensureUserRepo() {
    ensureRepository(userRepository, 'UserRepository');
  }

  function ensureRoleRepo() {
    ensureRepository(roleRepository, 'RoleRepository');
  }

  function ensureJwtService() {
    ensureRepository(jwtService, 'JwtService');
  }

  async function findByDelivery() {
    ensureUserRepo();
    return userRepository.findByDelivery();
  }

  // Login
  async function login(loginDto) {
    requiredPayload(loginDto, 'Login payload');
    const { email, password } = loginDto;
    requiredId(email, 'Email');
    requiredId(password, 'Password');

    ensureUserRepo();
    const myUser = await userRepository.findByEmail(email); // Buscar usuario por email
    if (!myUser) {
      const error = new Error('Email not found');
      error.status = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, myUser.password); // Compara contraseña
    if (!isPasswordValid) {
      const error = new Error('Incorrect password');
      error.status = 401;
      throw error;
    }

    ensureJwtService();
    const token = await jwtService.sign({ id: myUser.id, email: myUser.email }); // Generar token

    const data = {
      id: myUser.id,
      name: myUser.name,
      lastname: myUser.lastname,
      email: myUser.email,
      phone: myUser.phone,
      image: myUser.image,
      session_token: `JWT ${token}`,
      roles:
        typeof myUser.roles === 'string' ? JSON.parse(myUser.roles) : myUser.roles,
    };

    return { message: 'The user was authenticated', data };
  }


  // Registrar usuario
  async function register(userDto) {
    requiredPayload(userDto, 'User payload');

    ensureUserRepo();
    const id = await userRepository.create(userDto);
    return { id };
  }


  // Registrar usuario con imagen
  async function registerWithImage(userDto, files) {
    requiredPayload(userDto, 'User data');
    if (!userDto.email) {
      const error = new Error('User email is required');
      error.status = 400;
      throw error;
    }

    ensureUserRepo();
    const existingUser = await userRepository.findByEmail(userDto.email); // Verifica si el usuario ya existe
    if (existingUser) { // Si existe manda mensaje y no registra
      const error = new Error('Email is already registered');
      error.status = 409;
      throw error;
    }

    const url = await uploadImageIfExists(files); // Subir imagen
    if (url) {
      userDto.image = url;  // Guardar URL
    }

    ensureUserRepo();
    const id = await userRepository.create(userDto);  // Crear usuario
    userDto.id = `${id}`;   // Guardar ID. Convierte el ID a string.

    ensureJwtService();
    const token = await jwtService.sign({ id: userDto.id, email: userDto.email }); // Crear token
    userDto.session_token = `JWT ${token}`;  // Guardar token

    ensureRoleRepo();
    await roleRepository.create(userDto.id, 1);  // Asignar rol
    return userDto;   // Retornar usuario
  }

  async function updateWithImage(userDto, files) {   // Actualiza datos e imagen.
    requiredId(userDto?.id, 'User ID');    // Validar ID

    const url = await uploadImageIfExists(files);  // Subir imagen
    if (url) {
      userDto.image = url;  // Guardar URL
    }

    ensureUserRepo();
    await userRepository.update(userDto);  // Actualizar BD
    return userDto;  // Retornar
  }

  async function updateWithoutImage(userDto) { // Actualiza datos sin cambiar foto.
    requiredId(userDto?.id, 'User ID');  // Validar ID

    ensureUserRepo();
    await userRepository.updateWithoutImage(userDto);  // Actualizar
    return userDto;  // Retornar
  }

  function createLoginDTO(body) {
    return new UserDTO({ email: body.email, password: body.password });
  }

  return {
    findByDelivery,
    login,
    register,
    registerWithImage,
    updateWithImage,
    updateWithoutImage,
    createLoginDTO,
  };
}

module.exports = createUserUseCases;
