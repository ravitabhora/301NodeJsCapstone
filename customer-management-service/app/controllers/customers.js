const Customer = require('../models/customers.js');
var faker = require("faker");
const bcrypt = require('bcrypt');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.name) {
        return res.status(400).send({
            message: "Customer detail can not be empty"
        });
    }   
    const passwordhashed = bcrypt.hashSync(req.body.email, 10);
    // Create a Note
    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password : passwordhashed,
        address: req.body.address,
        status: 1
    });

    // Save Note in the database
    customer.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });

};


// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Customer.find()
        .then(customers => {
            res.send(customers);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Customer.findById(req.params.Id)
        .then(customer => {
            if (!customer) {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.Id
                });
            }
            res.send(customer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.Id
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.Id
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    if (!req.body.name || !req.body.phone) {
        return res.status(400).send({
            message: "Customer content can not be empty"
        });
    }

    // Find note and update it with the request body
    Customer.findByIdAndUpdate(req.params.Id, {
        name: req.body.name,
        phone: req.body.phone,
        status: 1
    }, { new: true })
        .then(customer => {
            if (!customer) {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.Id
                });
            }
            res.send(customer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.Id
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.Id
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Customer.findByIdAndUpdate(req.params.Id, {
        status: 0
    }, { new: true })
        .then(customer => {
            if (!customer) {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.Id
                });
            }
            return res.status(200).send({
                message: "Customer deleted with id " + req.params.Id
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.Id
                });
            }
            return res.status(500).send({
                message: "Error deleting note with id " + req.params.Id
            });
        });
};

// Add fake 2000 users 
exports.fakerdata = (req, res) => {
    // Initializing our variables with a different random data each time it is run

    for (let i = 0; i <= 10; i++) {
        var randomName = faker.name.findName(); // Generates a random name
        var randomEmail = faker.internet.email(); // Generates a random email
        var randomNumber = faker.phone.phoneNumber(); // Generates a random product name
        var randomstate = faker.address.state(); // Will give back a random company name
        var randomcity = faker.address.city(); // It's output is a random contact card containing many properties
        var randomaddress = faker.address.secondaryAddress();
        new Customer({
            name: randomName,
            phone: randomNumber,
            email: randomEmail,
            address: { city: randomcity, state: randomstate, detail: randomaddress },
            status: 1
        }).save();
    }
    res.send("data stored");

}