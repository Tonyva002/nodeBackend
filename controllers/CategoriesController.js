const Category = require("../models/category");
const storage = require("../utils/cloud_storage");

module.exports = {

  //Metodo para listar las categorias
 async getAll(req, res){
  Category.getAll((err, data) => {
     if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al listar las categorias",
          error: err,
        });
      }
      return res.status(201).json(data);
  })

 },


  // Metodo para crear categoria
  async create(req, res) {
    const category = JSON.parse(req.body.category); // Capturo los datos que me envie el cliente

    const files = req.files;

    if (files.length > 0) {
      const path = `image_${Date.now()}`;
      const url = await storage(files[0], path);

      if (url !== undefined && url !== null) {
        category.image = url;
      }
    }

    Category.create(category, (err, id) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al crear la categoria",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "La categoria se creo correctamente",
        data: `${id}`,
      });
    });
  },


  // Metodo para actualizar categoria con imagen
  async updateWithImage(req, res) {
    const category = JSON.parse(req.body.category); // Capturo los datos que me envie el cliente

    const files = req.files;

    if (files.length > 0) {
      const path = `image_${Date.now()}`;
      const url = await storage(files[0], path);

      if (url != undefined && url != null) {
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
        data: id
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
        data: `${id}`
      });

    })

  }
};
