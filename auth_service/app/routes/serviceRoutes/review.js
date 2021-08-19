const express = require('express');
const route = express.Router();
const { isAuthenticated } = require('../../utils/authenticate');
const reviewController = require('../../controllers/reviewController')

route.post('/', isAuthenticated, reviewController.create)

route.get('/:id', reviewController.index)

route.delete('/:id', (req, res) => {
    res.send("successful");
})

module.exports = route