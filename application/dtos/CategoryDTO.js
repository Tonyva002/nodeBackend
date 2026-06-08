class CategoryDTO {
  constructor({ id, name, description, image }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
  }

  static fromRequest(body) {
    return new CategoryDTO({
      id: body.id,
      name: body.name,
      description: body.description,
      image: body.image,
    });
  }
}

module.exports = CategoryDTO;
