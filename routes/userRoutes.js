const usersController = require('../controllers/usersController');
const passport = require('passport');


module.exports = (app, upload) => {
   
    app.post('/api/users/create', usersController.register);
    app.post('/api/users/createWithImage', upload.array('image', 1), usersController.registerWithImage);
    app.post('/api/users/login', usersController.login);

    app.get('/api/users/findByDelivery', passport.authenticate('jwt', {session: false}), usersController.findByDelivery);

    app.put('/api/users/updateWithImage', passport.authenticate('jwt', {session: false}), upload.array('image', 1), usersController.updateWithImage);
    app.put('/api/users/updateWithoutImage', passport.authenticate('jwt', {session: false}), usersController.updateWithoutImage);
}