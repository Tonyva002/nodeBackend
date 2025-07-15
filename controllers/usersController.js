const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const Rol = require("../models/rol");
const storage = require("../utils/cloud_storage");

module.exports = {

  findByDelivery(req, res){
    User.findByDelivery((err, data) => {
       if (err) {
        return res.status(500).json({
          success: false,
          message: "Error al listar los repartidores",
          error: err,
        });
      }

       return res.status(200).json(data);


    });

  },
  login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    User.findByEmail(email, async (err, myUser) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error registering user",
          error: err,
        });
      }
      if (!myUser) {
        return res.status(404).json({
          // El cliente no tiene autorizacion para realizar esta peticion (401)
          success: false,
          message: "Email not found",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, myUser.password);

      if (isPasswordValid) {
        const token = jwt.sign(
          { id: myUser.id, email: myUser.email },
          keys.secretOrKey,
          {}
        );
        const data = {
          id: myUser.id,
          name: myUser.name,
          lastname: myUser.lastname,
          email: myUser.email,
          phone: myUser.phone,
          image: myUser.image,
          session_token: `JWT ${token}`,
          roles: JSON.parse(myUser.roles),
        };

        return res.status(200).json({
          success: true,
          message: "The user was authenticated",
          data: data, // El Id del nuevo usuario que se registro
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Incorrect password",
        });
      }
    });
  },

  register: async (req, res) => {
    const user = req.body;

    try {
      User.create(user, (err, data) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Error registering user",
            error: err,
          });
        }

        return res.status(200).json({
          success: true,
          message: "Registered user successfully",
          data,
        });
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal error hashing password",
        error: error.message,
      });
    }
  },

  
 // Metodo para registrar usuario con imagen
 async registerWithImage(req, res) {
  const user = JSON.parse(req.body.user);
  const files = req.files;

  // 1. Validar email duplicado
  User.findByEmail(user.email, async (err, existingUser) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error checking user email',
        error: err,
      });
    }

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email is already registered',
      });
    }

    // 2. Subir imagen si existe
    const url = await uploadImageIfExists(files);
    if (url) user.image = url;

    // 3. Crear usuario
    User.create(user, (err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error registering user',
          error: err,
        });
      }

      user.id = `${data}`;
      const token = jwt.sign(
        { id: user.id, email: user.email },
        keys.secretOrKey,
        {}
      );
      user.session_token = `JWT ${token}`;

      // 4. Asignar rol por defecto (3)
      Rol.create(user.id, 3, (err, data) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Error registering user role',
            error: err,
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Registered user successfully',
          data: user,
        });
      });
    });
  });
},


  // Metodo para actualizar usuario con imagen
  async updateWithImage(req, res) {
    const user = JSON.parse(req.body.user); // Capturo los datos que me envie el cliente.

    const files = req.files;

    const url = await uploadImageIfExists(files);
    if (url) user.image = url;

    User.update(user, (err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error updating user ",
          error: err,
        });
      }

      return res.status(200).json({
        success: true,
        message: "User successfully updated",
        data: user,
      });
    });
  },

  // Metodo para actualizar usuario sin imagen
  async updateWithoutImage(req, res) {
    const user = req.body; // Capturo los datos que me envie el cliente.

    User.updateWithoutImage(user, (err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error updating user ",
          error: err,
        });
      }

      return res.status(200).json({
        success: true,
        message: "User successfully updated",
        data: user,
      });
    });
  },
};

async function uploadImageIfExists(files) {
  if (files && files.length > 0) {
    const path = `image_${Date.now()}`;
    const url = await storage(files[0], path);
    return url;
  }
  return null;
}
