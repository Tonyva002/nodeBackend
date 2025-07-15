const db = require("../config/config");
const Address = {};


Address.findAddressByUser = (id_user, result) => {
  const sql = `
 SELECT 
      CONVERT(id, char) AS id,
      address,
      neighborhood,
      zipcode,
      city,
      country,
      lat,
      lng,
      CONVERT(id_user, char) AS id_user
  FROM
     address
  WHERE
      id_user = ?   
  `;
  db.query(
    sql,
    id_user,
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

//Crear direccion
Address.create = (address, result) => {
  const sql = `
        insert into 
             address(
                address ,
                neighborhood,
                zipcode,
                city,
                country,
                lat,
                lng,
                id_user,
                created_at,
                updated_at
             )
        values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
  db.query(
    sql,
    [
      address.address,
      address.neighborhood,
      address.zipcode,
      address.city,
      address.country,
      address.lat,
      address.lng,
      address.id_user,
      new Date(),
      new Date(),
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        console.log("Id de la nueva direccion: ", res.insertId);
        result(null, res.insertId);
      }
    }
  );
};


module.exports = Address;
