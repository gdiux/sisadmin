require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// SERVER EXPRESS
const app = express();

// CONFIG CORS
app.use(cors());

// LECTURA Y PARSEO
app.use(express.json());

// DATABASE
dbConnection();

// ROUTES
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/categorias', require('./routes/categorias.routes'));
app.use('/api/subcategorias', require('./routes/subcategorias.routes'));
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/search', require('./routes/search.routes'));

app.listen(process.env.PORT, () => {

    console.log('servidor en pto ' + process.env.PORT);

});