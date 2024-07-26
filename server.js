const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');

/*
* Importar rutas
*/
const userRoutes = require('./routes/userRoutes');


const port = process.env.PORT || 3000;

app.use(logger('dev')); // Para debuguear los posibles errores.
app.use(express.json()); // Para parsear las repuestas en formato json.
app.use(express.urlencoded({
    extended: true

}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by'); // Para la seguridad

app.set('port', port);

/*
* Llamado de las rutas
*/
userRoutes(app);



server.listen(3000, '10.0.0.39' || 'localhost', function () {
    console.log('Aplicacion de NodeJS ' + process.pid + ' Iniciada...');

});



// ERROR HEANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});


app.get('/', (req, res) => {
    res.send('Ruta raiz del backend');
});

module.exports = {
    app: app,
    server: server
}

// 200 - ES UNA REPUESTA EXISTOSA
// 404 - SIGNIFICA QUE LA URL NO EXISTE
// 500 - ERROR INTERNO DEL SERVIDOR
