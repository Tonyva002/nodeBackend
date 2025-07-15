const Product = require("../models/product");
const storage = require("../utils/cloud_storage");

// Helper para convertir métodos callback en promesas
const createProductAsync = (product) =>
  new Promise((resolve, reject) => {
    Product.create(product, (err, id) => {
      if (err) reject(err);
      else resolve(id);
    });
  });

const updateProductAsync = (product) =>
  new Promise((resolve, reject) => {
    Product.update(product, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

const findByCategoryAsync = (id_category) =>
  new Promise((resolve, reject) => {
    Product.findByCategory(id_category, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

const deleteProductAsync = (id) =>
  new Promise((resolve, reject) => {
    Product.delete(id, (err, deletedId) => {
      if (err) reject(err);
      else resolve(deletedId);
    });
  });

module.exports = {
  // Listar productos por categoría
  async findByCategory(req, res) {
    const id_category = req.params.id_category;

    if (!id_category) {
      return res.status(400).json({
        success: false,
        message: "ID de categoría es requerido",
      });
    }

    try {
      const data = await findByCategoryAsync(id_category);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al listar los productos de la categoría",
        error,
      });
    }
  },



  
  // Crear producto con imágenes
  async create(req, res) {
    try {
      const product = JSON.parse(req.body.product);
      const files = req.files;

      if (!files || files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Error al registrar el producto, no tiene imágenes",
        });
      }

      // Crear producto en DB
      const id_product = await createProductAsync(product);
      product.id = id_product;

      // Subir imágenes
      const timestamp = Date.now();
      for (let i = 0; i < files.length; i++) {
        const path = `image_${timestamp}_${i}`;
        const url = await storage(files[i], path);
        if (url) {
          if (i === 0) product.image1 = url;
          else if (i === 1) product.image2 = url;
          else if (i === 2) product.image3 = url;
        }
      }

      // Actualizar producto con URLs de imágenes
      const data = await updateProductAsync(product);

      return res.status(200).json({
        success: true,
        message: "Producto creado correctamente",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al crear el producto",
        error,
      });
    }
  },






  // Actualizar producto con imagen
  async updateWithImage(req, res) {
    try {
      const product = JSON.parse(req.body.product);
      const files = req.files;

      if (files && files.length > 0) {
        const path = `image_${Date.now()}`;
        const url = await storage(files[0], path);

        if (url) {
          product.image = url;
        }
      }

      const id = await updateProductAsync(product);

      return res.status(200).json({
        success: true,
        message: "El producto se actualizó correctamente",
        data: `${id}`,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al actualizar el producto",
        error,
      });
    }
  },




  // Actualizar producto sin imagen
  async updateWithoutImage(req, res) {
    try {
      const product = req.body;
      const data = await updateProductAsync(product);

      return res.status(200).json({
        success: true,
        message: "El producto se actualizó correctamente",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al actualizar el producto",
        error,
      });
    }
  },



  // Eliminar producto
  async delete(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID del producto es requerido",
        });
      }

      const deletedId = await deleteProductAsync(id);

      return res.status(200).json({
        success: true,
        message: "El producto se eliminó correctamente",
        data: `${deletedId}`,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al eliminar el producto",
        error,
      });
    }
  },
};
