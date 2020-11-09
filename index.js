const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// Crea el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Parseo del body
app.use(express.json());

// Rutas
app.use('/mutation/', require('./routes/mutation'));
app.use('/stats/', require('./routes/stats'));

app.listen(process.env.PORT, () => {
  console.log(`Server started in port ${process.env.PORT}`);
});
