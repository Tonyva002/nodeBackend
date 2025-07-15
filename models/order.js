const db = require("../config/config");
const Order = {};

//Obtener orden por status (PAGADO, DESPACHADO, EN CAMINO, ENTREGADO)
Order.findByStatus = (status, result) => {
  const sql = `
  SELECT
    CONVERT(o.id, CHAR) AS id,
    CONVERT(o.id_customer, CHAR) AS id_customer,
    CONVERT(o.id_address, CHAR) AS id_address,
    CONVERT(o.id_delivery, CHAR) AS id_delivery,
    o.status,
    o.timestamp,

    JSON_OBJECT(
        'id', CONVERT(u.id, CHAR),
        'name', u.name,
        'lastname', u.lastname,
        'image', u.image,
        'phone', u.phone
    ) AS customer,

    JSON_OBJECT(
        'id', CONVERT(u2.id, CHAR),
        'name', u2.name,
        'lastname', u2.lastname,
        'image', u2.image,
        'phone', u2.phone
    ) AS delivery,

    JSON_OBJECT(
        'id', CONVERT(a.id, CHAR),
        'address', a.address,
        'neighborhood', a.neighborhood,
        'lat', a.lat,
        'lng', a.lng
    ) AS address,

    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', CONVERT(p.id, CHAR),
            'name', p.name,
            'description', p.description,
            'image1', p.image1,
            'image2', p.image2,
            'image3', p.image3,
            'price', p.price,
            'quantity', ohp.quantity
        )
    ) AS products

FROM
    orders AS o
INNER JOIN users AS u ON u.id = o.id_customer
LEFT JOIN users AS u2 ON u2.id = o.id_delivery
INNER JOIN address AS a ON a.id = o.id_address
INNER JOIN order_has_products AS ohp ON ohp.id_order = o.id
INNER JOIN products AS p ON p.id = ohp.id_product

WHERE
    o.status = ?

GROUP BY
    o.id
  `;
  db.query(
    sql,
    status,
    (err, data) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        result(null, data);
      }
    }
  )

}

//Obtener las ordenes asignada a un delivery
Order.findByDeliveryAndStatus = (id_delivery, status, result) => {
  const sql = `
  SELECT
    CONVERT(o.id, CHAR) AS id,
    CONVERT(o.id_customer, CHAR) AS id_customer,
    CONVERT(o.id_address, CHAR) AS id_address,
    CONVERT(o.id_delivery, CHAR) AS id_delivery,
    o.status,
    o.timestamp,

    JSON_OBJECT(
        'id', CONVERT(u.id, CHAR),
        'name', u.name,
        'lastname', u.lastname,
        'image', u.image,
        'phone', u.phone
    ) AS customer,

    JSON_OBJECT(
        'id', CONVERT(u2.id, CHAR),
        'name', u2.name,
        'lastname', u2.lastname,
        'image', u2.image,
        'phone', u2.phone
    ) AS delivery,

    JSON_OBJECT(
        'id', CONVERT(a.id, CHAR),
        'address', a.address,
        'neighborhood', a.neighborhood,
        'lat', a.lat,
        'lng', a.lng
    ) AS address,

    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', CONVERT(p.id, CHAR),
            'name', p.name,
            'description', p.description,
            'image1', p.image1,
            'image2', p.image2,
            'image3', p.image3,
            'price', p.price,
            'quantity', ohp.quantity
        )
    ) AS products

FROM
    orders AS o
INNER JOIN users AS u ON u.id = o.id_customer
LEFT JOIN users AS u2 ON u2.id = o.id_delivery
INNER JOIN address AS a ON a.id = o.id_address
INNER JOIN order_has_products AS ohp ON ohp.id_order = o.id
INNER JOIN products AS p ON p.id = ohp.id_product

WHERE
   o.id_delivery = ? AND  o.status = ?

GROUP BY
    o.id
  `;
  db.query(
    sql,
    [id_delivery, status],
    (err, data) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        result(null, data);
      }
    }
  )

}

//Crear orden
Order.create = (order, result) => {
  const sql = `
        INSERT INTO 
             orders(
                id_customer,
                id_address,
                status,
                timestamp,
                created_at,
                updated_at
             )
        VALUES(?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      order.id_customer,
      order.id_address, // ← aquí la corrección clave
      order.status || "PAGADO", // puedes mantener por defecto
      order.timestamp || Date.now(),
      new Date(),
      new Date(),
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        console.log("Id de la nueva orden: ", res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

//Actualizar orden a despachado
Order.updateToDispatched = (id_order, id_delivery, result) => {
  const sql = `
  update 
     orders
  set   
     id_delivery = ?,
     status = ?,
     updated_at = ?
  where
      id = ?   
  `;
  db.query(
    sql,
    [
      id_delivery,
      'DESPACHADO',
      new Date(),
      id_order
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        result(null, id_order);
      }
    }
  )
}


//Actualizar orden a en camino
Order.updateToOnTheWay = (id_order, id_delivery, result) => {
  const sql = `
  update 
     orders
  set   
     id_delivery = ?,
     status = ?,
     updated_at = ?
  where
      id = ?   
  `;
  db.query(
    sql,
    [
      id_delivery,
      'EN CAMINO',
      new Date(),
      id_order
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        result(null, id_order);
      }
    }
  )
}

// Actualizar orden a entregada
Order.updateToDelivered = (id_order, id_delivery, result) => {
  const sql = `
  update 
     orders
  set   
     id_delivery = ?,
     status = ?,
     updated_at = ?
  where
      id = ?   
  `;
  db.query(
    sql,
    [
      id_delivery,
      'ENTREGADO',
      new Date(),
      id_order
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        result(null, id_order);
      }
    }
  )
}


module.exports = Order;
