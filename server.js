const express = require('express');
const session = require('express-session');
const http = require('http');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// JWT
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(express.static('dist'));
app.disable('x-powered-by');

const upload = multer({ storage: multer.memoryStorage() });

// Rutas
const userRoutes = require('./routes/userRoutes');
const categoriesRoutes = require('./routes/categoryRoutes');
const productsRoutes = require('./routes/productRoutes');
const addressRoutes = require('./routes/addressRoutes');
const ordersRoutes = require('./routes/orderRoutes');

userRoutes(app, upload);
categoriesRoutes(app, upload);
productsRoutes(app, upload);
addressRoutes(app);
ordersRoutes(app);

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Ruta raiz del backend');
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.stack);
});

// Iniciar servidor
server.listen(port, () => {
    console.log(`Aplicación de NodeJS ${process.pid} iniciada en puerto ${port}`);
});

module.exports = { app, server };
