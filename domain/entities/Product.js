class Product {
  constructor({ id, name, description, price, image, image1, image2, image3, id_category }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.image1 = image1;
    this.image2 = image2;
    this.image3 = image3;
    this.id_category = id_category;
  }
}

module.exports = Product;
