// Native
const util = require('util');
const debuggin = util.debuglog('dev');
// Lib
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
// Local
const usuarioRoute = require('./routes/usuario/usuario.routes');
const { dbConnection } = require('./database/config.database');

const PORT = process.env.PORT;

app.listen(PORT, () => {
    debuggin(`Server listen on port ${PORT}`);
});

// DB connection

const conectarDB = async () =>{
    await dbConnection();
}
conectarDB();
app.use(cors());
app.use(express.json());
app.use('/api', usuarioRoute);