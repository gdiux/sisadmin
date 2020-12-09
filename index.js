require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// SERVER EXPRESS
const app = express();

// CONFIG CORS
app.use(cors());

// DATABASE
dbConnection();

// ROUTES
app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });
});

app.listen(process.env.PORT, () => {

    console.log('servidor en pto ' + process.env.PORT);

});