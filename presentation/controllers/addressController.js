const { addressUseCases } = require('../usecases');
const AddressDTO = require('../../application/dtos/AddressDTO');

function sendError(res, err) {
  const status = err.status || 500;
  return res.status(status).json({
    success: false,
    message: err.message || 'Internal server error',
    error: err.error || err,
  });
}

module.exports = {
  async findAddressByUser(req, res) {
    try {
      const data = await addressUseCases.findAddressByUser(req.params.id_user);
      return res.status(200).json(data);
    } catch (err) {
      return sendError(res, err);
    }
  },

  async create(req, res) {
    try {
      const addressDto = AddressDTO.fromRequest(req.body);
      const result = await addressUseCases.create(addressDto);
      return res.status(200).json({
        success: true,
        message: 'La direccion se creo correctamente',
        data: `${result.id}`,
      });
    } catch (err) {
      return sendError(res, err);
    }
  },

  async delete(req, res) {
    try {
      const result = await addressUseCases.remove(req.params.id);
      return res.status(200).json({
        success: true,
        message: 'La direccion se elimino correctamente',
        data: `${result.id}`,
      });
    } catch (err) {
      return sendError(res, err);
    }
  },
};
