const express = require('express');
const route = express.Router();

route.post('/create', (req,res) => {
    res.send("successful");
}) 

route.get('/:id', (req,res) => {
    res.send("successful");
})

route.put('/:id', (req,res) => {
    res.send("successful");
})

route.delete('/:id', (req,res) => {
    res.send("successful");
})

route.get('/search', (req,res) => {
    res.send("successful");
})

module.exports = route