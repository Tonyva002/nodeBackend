const express = require('express');
const session = require('express-session');
const http = require('http');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');
const errorHandler = require('./middlewares/errorHandler');

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
require('../infrastructure/config/passport')(passport);

app.use(express.static('dist'));
app.disable('x-powered-by');

require('./usecases');

const upload = multer({ storage: multer.memoryStorage() });

// Rutas
const registerRoutes = require('./routes');
registerRoutes(app, upload);

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Ruta raiz del backend');
});

// Error handler
app.use(errorHandler);

// Iniciar servidor
server.listen(port, () => {
    console.log(`Aplicación de NodeJS ${process.pid} iniciada en puerto ${port}`);
});

module.exports = { app, server };
