const express = require('express');
require("dotenv").config();
const cors = require('cors');
const app = express();

const apiRoutes = require('./routes/index');

const corsOptions = {
    origin: "http://localhost:4000"
}


app.use(cors(corsOptions));
app.use(express.json());
const swagger = require('../app/utils/swagger');
app.use("/", apiRoutes);
app.use('/services/doc', swagger.router);
module.exports = app;