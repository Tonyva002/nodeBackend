const Order = require("../models/order");
const OrderHasProduct = require("../models/order_has_product");

module.exports = {

  //Obtener orden por status(PAGADO, DESPACHADO, EN CAMINO, ENTREGADO)
  findByStatus(req, res) {
    const status = req.params.status;

    Order.findByStatus(status, (err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error al listar las ordenes",
          error: err,
        });
      }
      for(const d of data) {
        d.address  = JSON.parse(d.address);
        d.customer  = JSON.parse(d.customer);
        d.products  = JSON.parse(d.products);
        d.delivery  = JSON.parse(d.delivery);
      }
      return res.status(200).json(data);
    });
  },

  //Obtener las ordenes asignada a un delivery
  findByDeliveryAndStatus(req, res) {
    const id_delivery = req.params.id_delivery;
    const status = req.params.status;

    Order.findByDeliveryAndStatus(id_delivery, status, (err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error al listar las ordenes",
          error: err,
        });
      }
      for(const d of data) {
        d.address  = JSON.parse(d.address);
        d.customer  = JSON.parse(d.customer);
        d.products  = JSON.parse(d.products);
        d.delivery  = JSON.parse(d.delivery);
      }
      return res.status(200).json(data);
    });
  },


  //Metodo para Crear orden
  async create(req, res) {
    const { id_customer, id_address, products } = req.body;

    // Validación
    if (
      !id_customer ||
      !id_address ||
      !Array.isArray(products) ||
      products.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Faltan campos obligatorios: id_customer, id_address o products",
      });
    }

    const order = {
      id_customer,
      id_address,
      status: "PAGADO",
      timestamp: Date.now(),
    };

    Order.create(order, async (err, id_order) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error al crear la orden",
          error: err,
        });
      }

      try {
        for (const product of products) {
          await OrderHasProduct.create(
            id_order,
            product.id,
            product.quantity,
            (err2, result) => {
              if (err2) {
                throw err2;
              }
            }
          );
        }

        return res.status(200).json({
          success: true,
          message: "La orden se creó correctamente",
          data: id_order,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Error al insertar productos en la orden",
          error,
        });
      }
    });

  },

  // Actualizar orden a despachado
   updateToDispatched(req, res) {
      const order = req.body;

      Order.updateToDispatched(order.id, order.id_delivery, (err, id_order ) => {
        if (err) {
        return res.status(500).json({
          success: false,
          message: "Error al actualizar la orden a despachado",
          error: err,
        });
      }

      return res.status(200).json({
          success: true,
          message: "La orden se actualizo correctamente",
          data: `${id_order}`,
        });

      });

    },

    // Actualizar orden a en camino
   updateToOnTheWay(req, res) {
      const order = req.body;

      Order.updateToOnTheWay(order.id, order.id_delivery, (err, id_order ) => {
        if (err) {
        return res.status(500).json({
          success: false,
          message: "Error al actualizar la orden a en camino",
          error: err,
        });
      }

      return res.status(200).json({
          success: true,
          message: "La orden se actualizo correctamente",
          data: `${id_order}`,
        });

      });

    },

      // Actualizar orden a en camino
   updateToDelivered(req, res) {
      const order = req.body;

      Order.updateToDelivered(order.id, order.id_delivery, (err, id_order ) => {
        if (err) {
        return res.status(500).json({
          success: false,
          message: "Error al actualizar la orden a en camino",
          error: err,
        });
      }

      return res.status(200).json({
          success: true,
          message: "La orden se actualizo correctamente",
          data: `${id_order}`,
        });

      });

    }
};
