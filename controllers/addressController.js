const Address = require("../models/address");
const storage = require("../utils/cloud_storage");

module.exports = {


  findAddressByUser(req, res) {
  const id_user = req.params.id_user;
  Address.findAddressByUser(id_user, (err, data) => {
     if (err) {
        return res.status(500).json({
          success: false,
          message: "Error al tratar de obtener las direcciones",
          error: err,
        });
      }

      return res.status(200).json(data);

  })
},
  

  // Metodo para crear direcciones
    create(req, res) {
    const address = req.body; // Capturo los datos que me envie el cliente

    Address.create(address, (err, id) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error al crear la direccion",
          error: err,
        });
      }

      return res.status(200).json({
        success: true,
        message: "La direccion se creo correctamente",
        data: `${id}`,
      });
    });
  },

 
  //Metodo para eliminar categoria
  async delete(req, res) {
    const id = req.params.id;
    Address.delete(id, (err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error al eliminar la dirrecion",
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        message: "La direccion se elimino correctamente",
        data: `${id}`,
      });
    });
  },
};
