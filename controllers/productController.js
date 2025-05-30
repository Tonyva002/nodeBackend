const Product = require("../models/product");
const storage = require("../utils/cloud_storage");
const asyncForeach = require("../utils/async_foreach");

module.exports = {
  //Metodo para listar las categorias
  async getAll(req, res) {
    Product.getAll((err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al listar las categorias",
          error: err,
        });
      }
      return res.status(201).json(data);
    });
  },

  // Metodo para crear producto
  async create(req, res) {
    const product = JSON.parse(req.body.product); // Capturo los datos que me envie el cliente

    const files = req.files;

    let inserts = 0;

    if (files.length === 0) {
      return res.status(501).json({
        success: false,
        message: "Error al registrar el producto, no tiene imagenes",
      });
    } else {
      Product.create(product, (err, id_product) => {
        if (err) {
          return res.status(501).json({
            success: false,
            message: "Error al crear el producto",
            error: err,
          });
        }

        product.id = id_product;
        const start = async () => {
          await asyncForeach(files, async (file) => {
            const path = `image_${Date.now()}`;
            const url = await storage(file, path);

            if (url !== undefined && url !== null) {
              // CREO LA IMAGEN EN FIREBASE

              if (inserts === 0) {
                // IMAGEN 1
                product.image1 = url;
              } else if (inserts === 1) {
                // IMAGEN 2
                product.image2 = url;
              } else if (inserts === 1) {
                // IMAGEN 3
                product.image3 = url;
              }
            }
            await Product.update(product, (err, data) => {
              if (err) {
                return res.status(501).json({
                  success: false,
                  message: "Error al crear el producto",
                  error: err,
                });
              }
              inserts = inserts + 1;

              if (inserts === files.length) { // TERMINO DE ALMACENAR LAS TRES IMAGENES
                return res.status(201).json({
                  success: true,
                  message: "El producto se creo correctamente",
                  data: data,
                });
              }
            });
          });
        };

        start();
      });
    }
  },

  // Metodo para actualizar categoria con imagen
  async updateWithImage(req, res) {
    const category = JSON.parse(req.body.category); // Capturo los datos que me envie el cliente

    const files = req.files;

    if (files.length > 0) {
      const path = `image_${Date.now()}`;
      const url = await storage(files[0], path);

      if (url !== undefined && url !== null) {
        category.image = url;
      }
    }

    Category.update(category, (err, id) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al actualizar la categoria",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "La categoria se actualizo correctamente",
        data: `${id}`,
      });
    });
  },

  // Metodo para actualizar categoria sin imagen
  async updateWithoutImage(req, res) {
    const category = req.body; // Capturo los datos que me envie el cliente
    Category.update(category, (err, id) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al actualizar la categoria",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "La categoria se actualizo correctamente",
        data: id,
      });
    });
  },

  //Metodo para eliminar categoria
  async delete(req, res) {
    const id = req.params.id;
    Category.delete(id, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al eliminar la categoria",
          error: err,
        });
      }
      return res.status(201).json({
        success: true,
        message: "La categoria se elimino correctamente",
        data: `${id}`,
      });
    });
  },
};
