const db = require("../config/config");
const Category = {};

Category.getAll = (result) => {
  const sql = `
  select
    id,
    name,
    description,
    image
  from
     categories
  order by 
     name  
  `;
  db.query(
    sql,
    (err, data) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        console.log("Id de la nueva categoria: ", data);
        result(null, data);
      }
    }
  )

}

Category.create = (category, result) => {
  const sql = `
        insert into 
             categories(
                name,
                description,
                image,
                created_at,
                updated_at
             )
        values(?, ?, ?, ?, ?)
        `;
  db.query(
    sql,
    [
      category.name,
      category.description,
      category.image,
      new Date(),
      new Date(),
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        console.log("Id de la nueva categoria: ", res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

Category.update = (category, result) => {
  const sql = `
  UPDATE
     categories
  SET
     name = ?,
     description = ?,
     image = ?,  
     updated_at = ? 
  WHERE
      id = ?   
  `;
  db.query(
    sql,
    [
      category.name,
      category.description,
      category.image,
      new Date(),
      category.id
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        console.log("Id de la categoria actualizada: ", category.id);
        result(null, category.id);
      }
    }
  )

}

Category.delete = (id, result) => {
  const sql = `
  delete from 
      categories
  where
      id = ?
  `;
  db.query(
    sql,
    id,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        console.log("Id de la categoria eliminada: ", id);
        result(null, id);
      }
    }

  )
}
module.exports = Category;