const db = require("..//config/config");
const bcrypt = require("bcryptjs");
const User = {};

User.create = async (user, result) => {
  const hash = await bcrypt.hash(user.password, 10);

  const sql = `
    INSERT INTO 
    users(
    email,
    name,
    lastname,
    phone,
    image,
    password,
    created_at,
    updated_at
    ) VALUES(?, ?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(
    sql,
    [
      user.email,
      user.name,
      user.lastname,
      user.phone,
      user.image,
      hash,
      new Date(),
      new Date(),
    ],

    (err, res) => {
      if (err) {
        console.log("Error al registrar usuario: ", err);
        result(err, null);
      } else {
        console.log("Id del nuevo usuario: ", res.insertId);
        result(null, res.insertId);
      }
    }
  );
};


User.findById = (id, result) => {
  const sql = `
        SELECT
        u.id,
        u.email,
        u.name,
        u.lastname,
        u.phone,
        u.image,
        u.password,
        json_arrayagg(
            JSON_OBJECT(
              'id', CONVERT(r.id, char),
              'name', r.name,
              'image', r.image,
              'route', r.route
            )
        ) as roles
    FROM
        users as u
    inner join
        user_has_roles as uhr
    on 
      uhr.id_user = u.id
    inner join
      roles as r
    on
      uhr.id_rol = r.id
    WHERE
        u.id = ?    
    group by 
        u.id    
  
    `;
  db.query(sql, [id], (err, user) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      console.log("Usuario obtenido: ", user[0]);
      result(null, user[0]);
    }
  });
};

User.findByEmail = (email, result) => {
  const sql = `
    SELECT
        u.id,
        u.email,
        u.name,
        u.lastname,
        u.phone,
        u.image,
        u.password,
        json_arrayagg(
            JSON_OBJECT(
              'id', CONVERT(r.id, char),
              'name', r.name,
              'image', r.image,
              'route', r.route
            )
        ) as roles
    FROM
        users as u
    inner join
        user_has_roles as uhr
    on 
      uhr.id_user = u.id
    inner join
      roles as r
    on
      uhr.id_rol = r.id
    WHERE
        email = ?    
    group by 
        u.id    
    
    `;
  db.query(sql, [email], (err, user) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      console.log("Usuario obtenido: ", user[0]);
      result(null, user[0]);
    }
  });
};

User.update = (user, result) => {
  const sql = `
    UPDATE
        users
    SET
     name = ?,
     lastname = ?,
     phone = ?,
     image = ?,
     updated_at = ?
    WHERE
        id = ?    
    `;
  db.query(
    sql,
    [user.name, user.lastname, user.phone, user.image, new Date(), user.id],

    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        console.log("Usuario actualizado: ", user.id);
        result(null, user.id);
      }
    }
  );
};

User.updateWithoutImage = (user, result) => {
  const sql = `
    UPDATE
        users
    SET
        name = ?,
        lastname = ?,
        phone = ?,
        updated_at = ?
    WHERE
        id = ?    
    `;
  db.query(
    sql,
    [user.name, user.lastname, user.phone, new Date(), user.id],

    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        console.log("Usuario actualizado: ", user.id);
        result(null, user.id);
      }
    }
  );
};

module.exports = User;
