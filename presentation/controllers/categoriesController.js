const { categoryUseCases } = require('../usecases');
const CategoryDTO = require('../../application/dtos/CategoryDTO');

function sendError(res, err) {
  const status = err.status || 500;
  return res.status(status).json({
    success: false,
    message: err.message || 'Internal server error',
    error: err.error || err,
  });
}

module.exports = {
  async getAll(req, res) {
    try {
      const data = await categoryUseCases.getAll();
      return res.status(200).json(data);
    } catch (err) {
      return sendError(res, err);
    }
  },

  async create(req, res) {
    try {
      const categoryDto = CategoryDTO.fromRequest(JSON.parse(req.body.category));
      const result = await categoryUseCases.create(categoryDto, req.files);
      return res.status(200).json({
        success: true,
        message: 'La categoria se creo correctamente',
        data: `${result.id}`,
      });
    } catch (err) {
      return sendError(res, err);
    }
  },

  async updateWithImage(req, res) {
    try {
      const categoryDto = CategoryDTO.fromRequest(JSON.parse(req.body.category));
      const result = await categoryUseCases.updateWithImage(categoryDto, req.files);
      return res.status(200).json({
        success: true,
        message: 'La categoria se actualizo correctamente',
        data: `${result.id}`,
      });
    } catch (err) {
      return sendError(res, err);
    }
  },

  async updateWithoutImage(req, res) {
    try {
      const categoryDto = CategoryDTO.fromRequest(req.body);
      const result = await categoryUseCases.updateWithoutImage(categoryDto);
      return res.status(200).json({
        success: true,
        message: 'La categoria se actualizo correctamente',
        data: `${result.id}`,
      });
    } catch (err) {
      return sendError(res, err);
    }
  },

  async delete(req, res) {
    try {
      const result = await categoryUseCases.remove(req.params.id);
      return res.status(200).json({
        success: true,
        message: 'La categoria se elimino correctamente',
        data: `${result.id}`,
      });
    } catch (err) {
      return sendError(res, err);
    }
  },
};
