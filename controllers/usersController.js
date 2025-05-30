const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const Rol = require("../models/rol");
const storage = require("../utils/cloud_storage");

module.exports = {
  
  login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findByEmail(email, async (err, myUser) => {
   
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error registering user",
          error: err,
        });
      }
      if (!myUser) {
        return res.status(401).json({
          // El cliente no tiene autorizacion para realizar esta peticion (401)
          success: false,
          message: "The email was not found",
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
          roles: JSON.parse(myUser.roles)
        };

        return res.status(201).json({
          success: true,
          message: "The user was authenticated",
          data: data, // El Id del nuevo usuario que se registro
        });
      } else {
        return res.status(401).json({
          // El cliente no tiene autorizacion para realizar esta peticion (401)
          success: false,
          message: "The password is incorrect",
        });
      }
    });
  },

  register(req, res) {
    const user = req.body; // Capturo los datos que me envie el cliente
    User.create(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error registering user",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "Registered user successfully",
        data: data, // El Id del nuevo usuario que se registro
      });
    });
  },



  async registerWithImage(req, res) {
    const user = JSON.parse(req.body.user); // Capturo los datos que me envie el cliente

    const files = req.files;

    if (files.length > 0) {
      const path = `image_${Date.now()}`;
      const url = await storage(files[0], path);

      if (url != undefined && url != null) {
        user.image = url;
      }
    }

    User.create(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error registering user",
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

      Rol.create(
        user.id,
        3,
        (err,
        (data) => {
          if (err) {
            return res.status(501).json({
              success: false,
              message: "Error registering user role",
              error: err,
            });
          } else {
            return res.status(201).json({
              success: true,
              message: "Registered user successfully",
              data: user, // Retornamos el usuario
            });
          }
        })
      );
    });
  },


  // Metodo para actualizar usuario con imagen
     async updateWithImage(req, res) {
        const user = JSON.parse(req.body.user);  // Capturo los datos que me envie el cliente.
       
        const files = req.files;

        if(files.length > 0) {
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);
            
            if(url != undefined && url != null){
                user.image = url;

            }
        }
        
        User.update(user, (err, data) => {

            if(err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error updating user ',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'User successfully updated',
                data: user 
            });


        });
    },


    // Metodo para actualizar usuario sin imagen
    async updateWithoutImage(req, res) {
        const user = req.body;  // Capturo los datos que me envie el cliente.
    
        
        User.updateWithoutImage(user, (err, data) => {

            if(err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error updating user ',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'User successfully updated',
                data: user 
            });


        });
    },
    
};
