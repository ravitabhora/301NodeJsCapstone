
const Helper = require('../utils/axios');
const _ = require('lodash')
const { publish } = require('../utils/publisher');

const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');

const logger = new Logger();
const requestHandler = new RequestHandler(logger);

class reviewController {

    static async index(req, res) {
        try {
            const result = await Helper.makeRequestToGetOne(process.env.REVIEW_URL + "/reviews/" + req.params.id);
            if ((_.isUndefined(result.error))) {
                const reviews = result;
                requestHandler.sendSuccess(res, "reviews saved", 200)({ reviews });
            } else {
                requestHandler.sendError(req, res, result.error);
            }
        } catch (err) {
            requestHandler.sendError(req, res, err);
        }
    }

    static async getList(req, res) {
        try {
            const result = await Helper.makeRequestToGetOne(process.env.REVIEW_URL + "/reviews/");
            if ((_.isUndefined(result.error))) {
                const reviews = result;
                requestHandler.sendSuccess(res, customer.message, 200)({ reviews });
            } else {
                requestHandler.sendError(req, res, result.error);
            }
        } catch (err) {
            requestHandler.sendError(req, res, err);
        }
    }

    static async create(req, res) {
        try {
            const result = await Helper.makeRequestWithBodyPut(process.env.REVIEW_URL + "/reviews", req.body);
            if ((_.isUndefined(result.error))) {
                const review = JSON.parse(result.data);
                publish(review);
                requestHandler.sendSuccess(res, 'Reviews has been successfuly saved', 200)({ review });
            } else {
                requestHandler.sendError(req, res, result.error);
            }
        } catch (err) {
            requestHandler.sendError(req, res, err);
        }
    }

    static async delete(req, res) {
        try {
            const result = await Helper.makeRequestToDelete(process.env.REVIEW_URL + "/reviews/" + req.params.id);
            if ((_.isUndefined(result.error))) {

                requestHandler.sendSuccess(res, reviews, 200)();
            } else {
                requestHandler.sendError(req, res, result.error);
            }
        } catch (err) {
            requestHandler.sendError(req, res, err);
        }
    }
}

module.exports = reviewController;