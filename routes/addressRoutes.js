const addressController = require('../controllers/addressController');
const passport = require('passport');

module.exports = (app, upload) => {

        app.get('/api/address/findAddressByUser/:id_user', passport.authenticate('jwt', {session: false}), addressController.findAddressByUser);
        app.post('/api/address/create', passport.authenticate('jwt', {session: false}), addressController.create);
      //  app.put('/api/categories/updateWithImage', passport.authenticate('jwt', {session: false}), upload.array('image', 1), addressController.updateWithImage);
      //  app.put('/api/categories/updateWithoutImage', passport.authenticate('jwt', {session: false}), addressController.updateWithoutImage);
      //  app.delete('/api/categories/delete/:id', passport.authenticate('jwt', {session: false}), addressController.delete);
}