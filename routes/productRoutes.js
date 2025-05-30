const productsController = require('../controllers/productController');
const passport = require('passport');

module.exports = (app, upload) => {

     //   app.get('/api/categories/getAll', passport.authenticate('jwt', {session: false}), categoriesController.getAll);
        app.post('/api/products/create', passport.authenticate('jwt', {session: false}), upload.array('image', 3), productsController.create);
       // app.put('/api/categories/updateWithImage', passport.authenticate('jwt', {session: false}), upload.array('image', 1), categoriesController.updateWithImage);
       // app.put('/api/categories/updateWithoutImage', passport.authenticate('jwt', {session: false}), categoriesController.updateWithoutImage);
       // app.delete('/api/categories/delete/:id', passport.authenticate('jwt', {session: false}), categoriesController.delete);
}