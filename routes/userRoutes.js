const usersController = require('../controllers/usersController');
const passport = require('passport');


module.exports = (app, upload) => {
    // GET  -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT  -> ACTUALIZAR DATOS
    
    app.post('/api/users/create', usersController.register);
    app.post('/api/users/createWithImage', upload.array('image', 1), usersController.registerWithImage);
    app.post('/api/users/login', usersController.login);


    app.put('/api/users/updateWithImage', passport.authenticate('jwt', {session: false}), upload.array('image', 1), usersController.updateWithImage);
    app.put('/api/users/updateWithoutImage', passport.authenticate('jwt', {session: false}), usersController.updateWithoutImage);
}