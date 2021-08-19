const express = require('express');
const route = express.Router();

route.post('/search', (req,res) => {
    res.send("successful");
}) 

route.get('/:id', (req,res) => {
    res.send("successful");
})

module.exports = route