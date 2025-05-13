const playersController = require('../controllers/playersController');
const passport = require('passport');

module.exports = (app, upload) => {
    // GET  -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT  -> ACTUALIZAR DATOS
    // DELETE  -> Eliminar datos
 app.get('/api/players/getAll', passport.authenticate('jwt', {session: false}),playersController.getAll);
 app.put('/api/players/update', passport.authenticate('jwt', {session: false}),playersController.update);
    
  
}