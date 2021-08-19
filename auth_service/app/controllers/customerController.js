
const Helper = require('../utils/axios');
const _ = require('lodash')
const { generateToken } = require('../utils/authenticate');

const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');


const logger = new Logger();
const requestHandler = new RequestHandler(logger);

class customerController {

    static async index(req, res) {
        try {
          
            const result = await Helper.makeRequestToGetOne(`http://localhost:3000/api/customers/${req.params.id}`);
            if ((_.isUndefined(result.error))) {
                const customer = result;
                requestHandler.sendSuccess(res, customer.message, 200)({customer});
            } else {
                requestHandler.sendError(req, res, result.error);
            }
        } catch (err) {

            requestHandler.sendError(req, res, err);
        }
    }

    static async getList(req, res) {
        try {
            const result = await Helper.makeRequestToGetOne(`http://localhost:3000/api/customers`);
            if ((_.isUndefined(result.error))) {
                const customer = result;
                requestHandler.sendSuccess(res, customer.message, 200)({customer});
            } else {
                requestHandler.sendError(req, res, result.error);
            }
        } catch (err) {
            requestHandler.sendError(req, res, err);
        }
    }

    static async create(req, res) {
        console.log("dgdsfgsf");
        try {
            
            const result = await Helper.makeRequestWithBodyOnly('http://localhost:3000/api/customers', req.body);

            if ((_.isUndefined(result.error))) {
                console.log(result);
                const customer = result.data;
                const token = generateToken({ id: customer._id, email: customer.email })
                requestHandler.sendSuccess(res, 'Customer has been successfuly created', 201)({ customer, token });
            } else {
                console.log(result);
                requestHandler.sendError(req, res, result.error);
            }
        } catch (err) {
            console.log(err);
            requestHandler.sendError(req, res, err);
        }
    }

    static async update(req, res) {
        try {
            const result = await Helper.makeRequestWithParamAndBody(`http://localhost:3000/api/customers/${req.params.id}`, req.body);
            if ((_.isUndefined(result.error))) {
                const customer = result;
                requestHandler.sendSuccess(res, 'Customer has been updated successfully', 200)({ customer });
            } else {
                requestHandler.sendError(req, res, result.error);
            }
        } catch (err) {

            requestHandler.sendError(req, res, err);
        }
    }

    static async delete(req, res) {
        try {
            const result = await Helper.makeRequestToDelete(`http://localhost:3000/api/customers/${req.params.id}`);
            if ((_.isUndefined(result.error))) {
                const customer = result;
                requestHandler.sendSuccess(res, customer.message, 200)();
            } else {
                requestHandler.sendError(req, res, result.error);
            }
        } catch (err) {
            requestHandler.sendError(req, res, err);
        }
    }
}

module.exports = customerController;