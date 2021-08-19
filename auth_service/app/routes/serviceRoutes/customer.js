const express = require('express');
const route = express.Router();
const { isAuthenticated } = require('../../utils/authenticate');
const customerController = require('../../controllers/customerController')

route.post('/signUp', customerController.create)  

route.post('/login', (req,res) => {
    res.send("successful");
}) 

route.put('/:id', isAuthenticated, customerController.update)

route.delete('/:id', isAuthenticated, customerController.delete)

route.get('/:id', isAuthenticated, customerController.index)

route.get('/', isAuthenticated, customerController.getList)

module.exports = route