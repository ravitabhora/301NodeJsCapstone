const express = require('express');

const bodyParser = require('body-parser');
const cors = require("cors");
const apiRoutes = require("./routes/index")

var corsOptions = {
  origin: "http://localhost:8080"
};

const app = express();

const swagger = require('../app/utils/swagger');
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/docs', swagger.router);
app.use("/api", apiRoutes);
app.set('db', require('./models/index'));
app.get("/", function (req, res) {
  res.send("Hello World!");
});

module.exports = app;