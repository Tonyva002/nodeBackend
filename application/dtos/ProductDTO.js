class ProductDTO {
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

  static fromRequest(body) {
    return new ProductDTO({
      id: body.id,
      name: body.name,
      description: body.description,
      price: body.price,
      image: body.image,
      image1: body.image1,
      image2: body.image2,
      image3: body.image3,
      id_category: body.id_category,
    });
  }
}

module.exports = ProductDTO;
