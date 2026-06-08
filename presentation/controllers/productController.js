const { productUseCases } = require('../usecases');
const ProductDTO = require('../../application/dtos/ProductDTO');

function sendError(res, err) {
  const status = err.status || 500;
  return res.status(status).json({
    success: false,
    message: err.message || 'Internal server error',
    error: err.error || err,
  });
}

module.exports = {
  async findByCategory(req, res) {
    try {
      const data = await productUseCases.findByCategory(req.params.id_category);
      return res.status(200).json(data);
    } catch (err) {
      return sendError(res, err);
    }
  },

  async create(req, res) {
    try {
      const productDto = ProductDTO.fromRequest(JSON.parse(req.body.product));
      const data = await productUseCases.create(productDto, req.files);
      return res.status(200).json({
        success: true,
        message: 'Producto creado correctamente',
        data,
      });
    } catch (err) {
      return sendError(res, err);
    }
  },

  async updateWithImage(req, res) {
    try {
      const productDto = ProductDTO.fromRequest(JSON.parse(req.body.product));
      const result = await productUseCases.updateWithImage(productDto, req.files);
      return res.status(200).json({
        success: true,
        message: 'El producto se actualizó correctamente',
        data: `${result.id}`,
      });
    } catch (err) {
      return sendError(res, err);
    }
  },

  async updateWithoutImage(req, res) {
    try {
      const productDto = ProductDTO.fromRequest(req.body);
      const result = await productUseCases.updateWithoutImage(productDto);
      return res.status(200).json({
        success: true,
        message: 'El producto se actualizó correctamente',
        data: result,
      });
    } catch (err) {
      return sendError(res, err);
    }
  },

  async delete(req, res) {
    try {
      const result = await productUseCases.remove(req.params.id);
      return res.status(200).json({
        success: true,
        message: 'El producto se eliminó correctamente',
        data: `${result.id}`,
      });
    } catch (err) {
      return sendError(res, err);
    }
  },
};
