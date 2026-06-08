class UserDTO {
  constructor({ id, email, name, lastname, phone, image, password, roles }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.lastname = lastname;
    this.phone = phone;
    this.image = image;
    this.password = password;
    this.roles = roles;
  }

  static fromRequest(body) {
    return new UserDTO({
      id: body.id,
      email: body.email,
      name: body.name,
      lastname: body.lastname,
      phone: body.phone,
      image: body.image,
      password: body.password,
      roles: body.roles,
    });
  }
}

module.exports = UserDTO;
