class User {
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
}

module.exports = User;
