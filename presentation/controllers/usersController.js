const { userUseCases } = require('../usecases');
const UserDTO = require('../../application/dtos/UserDTO');

function sendError(res, err) {
  const status = err.status || 500;
  return res.status(status).json({
    success: false,
    message: err.message || 'Internal server error',
    error: err.error || err,
  });
}

module.exports = {
  async findByDelivery(req, res) {
    try {
      const data = await userUseCases.findByDelivery();
      return res.status(200).json(data);
    } catch (err) {
      return sendError(res, err);
    }
  },

  async login(req, res) {
    try {
      const loginDto = UserDTO.fromRequest(req.body);
      const result = await userUseCases.login(loginDto);
      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } catch (err) {
      return sendError(res, err);
    }
  },

  async register(req, res) {
    try {
      const userDto = UserDTO.fromRequest(req.body);
      const result = await userUseCases.register(userDto);
      return res.status(200).json({
        success: true,
        message: 'Registered user successfully',
        data: result,
      });
    } catch (err) {
      return sendError(res, err);
    }
  },

  async registerWithImage(req, res) {
    try {
      const userDto = UserDTO.fromRequest(JSON.parse(req.body.user));
      const result = await userUseCases.registerWithImage(userDto, req.files);
      return res.status(200).json({
        success: true,
        message: 'Registered user successfully',
        data: result,
      });
    } catch (err) {
      return sendError(res, err);
    }
  },

  async updateWithImage(req, res) {
    try {
      const userDto = UserDTO.fromRequest(JSON.parse(req.body.user));
      const result = await userUseCases.updateWithImage(userDto, req.files);
      return res.status(200).json({
        success: true,
        message: 'User successfully updated',
        data: result,
      });
    } catch (err) {
      return sendError(res, err);
    }
  },

  async updateWithoutImage(req, res) {
    try {
      const userDto = UserDTO.fromRequest(req.body);
      const result = await userUseCases.updateWithoutImage(userDto);
      return res.status(200).json({
        success: true,
        message: 'User successfully updated',
        data: result,
      });
    } catch (err) {
      return sendError(res, err);
    }
  },
};
