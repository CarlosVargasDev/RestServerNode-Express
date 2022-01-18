// Dependencias: npm i bcryptjs cors dotenv express express-validator jsonwebtoken mongoose
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config.db');


const port = process.env.PORT || 4001;


// Crear el servidorde express
const app = express();

// Directorio publico
app.use(express.static('public'));

// Base de datos
dbConnection();


// CORS
app.use(cors());

// Lectura y parseo del body
app.use( express.json());

// RUTAS API
app.use('/api/auth', require('./routes/auth.routes') );

app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto ${port}`);
});