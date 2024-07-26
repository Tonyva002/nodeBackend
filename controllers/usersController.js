const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = {

    login(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async (err, myUser) => {

            console.log('Error ', err);
            console.log('Usuario ', myUser);

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error registering user',
                    error: err
                });
            }
            if (!myUser) {
                return res.status(401).json({  // El cliente no tiene autorizacion para realizar esta peticion (401)
                    success: false,
                    message: 'The email was not found',

                });

            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password);

            if (isPasswordValid) {
                const token = jwt.sign({ id: myUser.id, email: myUser.email }, keys.secretOrKey, {});
                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`
                }

                return res.status(201).json({
                    success: true,
                    message: 'The user was authenticated',
                    data: data // El Id del nuevo usuario que se registro

                });

            }else{
                return res.status(401).json({  // El cliente no tiene autorizacion para realizar esta peticion (401)
                    success: false,
                    message: 'The password is incorrect',

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
                    message: 'Error registering user',
                    error: err
                });
            }

            return res.status(201).json({

                success: true,
                message: 'Registered user successfully',
                data: data // El Id del nuevo usuario que se registro

            });
        });
    }
}