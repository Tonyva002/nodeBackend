const usersController = require('../controllers/usersController');


module.exports = (app) => {
    // GET  -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT  -> ACTUALIZAR DATOS
    
    app.post('/api/users/create', usersController.register);
    app.post('/api/users/login', usersController.login);
}