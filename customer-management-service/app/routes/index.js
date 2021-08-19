const Customer = require('../models/customers.js');
module.exports = (app) => {
    const customers = require('../controllers/customers.js');

    // Create a new Customer
    app.post('/api/customers', customers.create);

    // Retrieve all customers
    app.get('/api/customers', customers.findAll);

    // Retrieve a single Customer with Id
    app.get('/api/customers/:Id', customers.findOne);

    // Update a Customer with Id
    app.put('/api/customers/:Id', customers.update);

    // Delete a Customer with Id
    app.delete('/api/customers/:Id', customers.delete);

    // Add faker details
    app.post('/api/customers/faker', customers.fakerdata);
}