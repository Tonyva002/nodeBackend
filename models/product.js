const db = require("../config/config");
const Product = {};

Product.getAll = (result) => {
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

Product.create = (product, result) => {
  const sql = `
        insert into 
             categories(
                name,
                description,
                price,
                image1,
                image2,
                image3,
                id_category,
                created_at,
                updated_at
             )
        values(?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
  db.query(
    sql,
    [
      product.name,
      product.description,
      product.price,
      product.image1,
      product.image2,
      product.image3,
      product.id_category,
      new Date(),
      new Date(),
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        console.log("Id del nuevo producto: ", res.insertId);
        result(null, res.insertId);
      }
    }
  );
};



Product.update = (product, result) => {
  const sql = `
  UPDATE
     products
  SET
     name = ?,
     description = ?,
     price = ?,
     image1 = ?,
     image2 = ?,
     image3 = ?,
     id_category = ?,
     updated_at = ?
  WHERE
      id = ?   
  `;
  db.query(
    sql,
    [
      product.name,
      product.description,
      product.price,
      product.image1,
      product.image2,
      product.image3,
      product.id_category,
      new Date(),
      product.id
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        console.log("Id del producto actualizado: ", product.id);
        result(null, product.id);
      }
    }
  )

}

Product.delete = (id, result) => {
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
module.exports = Product;