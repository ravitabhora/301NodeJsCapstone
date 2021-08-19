const express = require('express');
const route = express.Router();

route.get('/generate-token', (req,res) => {
    res.send("successful");
}) 

route.post('/refresh-token', (req,res) => {
    res.send("successful");
})

module.exports = route;