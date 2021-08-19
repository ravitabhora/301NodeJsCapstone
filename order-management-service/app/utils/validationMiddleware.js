const Joi = require("joi");
const _ = require('lodash');
const { keys } = require('lodash');

const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');

const logger = new Logger();
const requestHandler = new RequestHandler(logger);

module.exports = (useJoiError = false, _schema) => {
    // useJoiError determines if we should respond with the base Joi error
    // boolean: defaults to false
    const _useJoiError = _.isBoolean(useJoiError) && useJoiError;

    // enabled HTTP methods for request data validation
    const _supportedMethods = ['post', 'put'];

    // Joi validation options
    const _validationOptions = {
        abortEarly: false,  // abort after the last validation error
        allowUnknown: true, // allow unknown keys that will be ignored
        stripUnknown: true  // remove unknown keys from the validated data
    };

    // return the validation middleware
    return (req, res, next) => {
        const method = req.method.toLowerCase();

        if (_.includes(_supportedMethods, method)) {
            // get schema for the current route
            try {
                ['params', 'body', 'query', 'headers'].forEach(function (key) {
                    if (_schema[key]) {
                        var { error, value } = _schema[key].validate(req[key], _validationOptions);
                        if (error) {
                            requestHandler.validateJoi(error, 400, 'bad Request', error ? "Validation Error" : "", customizedError(error.details), res);
                        } else {
                            req[key] = value;
                        }
                    }
                });
                next();
            } catch (error) {
                requestHandler.sendError(req, res, error);
            }
        } else {
            next();
        }
    };

    function customizedError(errors) {
        var arr = [];
        const regex = /\"/gi;
        errors.forEach(val => {
            arr.push({ field: val.context.key, message: (val.message.replace(regex, '')).replace('body.', '') })
        });
        console.log(arr);
        return arr;
    }
};