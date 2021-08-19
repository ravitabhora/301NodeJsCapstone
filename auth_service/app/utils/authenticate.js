const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('../config/appconfig');
const RequestHandler = require('./RequestHandler');
const Logger = require('./logger');

const logger = new Logger();
const requestHandler = new RequestHandler(logger);

function getTokenFromHeader(req) {
    if ((req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token')
        || (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
        return req.headers.authorization.split(' ')[1];
    }

    return null;
}

function verifyToken(req, res, next) {
    try {
        if (_.isUndefined(req.headers.authorization)) {
            requestHandler.throwAuthError(401, 'Unauthorized', 'Not Authorized to access this resource!')();
        }
        const Bearer = req.headers.authorization.split(' ')[0];

        if (!Bearer || Bearer !== 'Bearer') {
            requestHandler.throwAuthError(401, 'Unauthorized', 'Not Authorized to access this resource!')();
        }
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            requestHandler.throwAuthError(401, 'Unauthorized', 'Not Authorized to access this resource!')();
        }

        // verifies secret and checks exp
        jwt.verify(token, config.auth.jwt_secret, (err, decoded) => {
            if (err) {
                requestHandler.throwAuthError(401, 'Unauthorized', 'please provide a vaid token, your token might be expired')();
            }
            req.decoded = decoded;
            next();
        });
    } catch (err) {
        console.log(err);
        requestHandler.sendError(req, res, err);
    }
}
function generateToken(params) {
    return  jwt.sign({ params }, config.auth.jwt_secret, { expiresIn: config.auth.jwt_expiresin, algorithm: 'HS512' });
}


module.exports = { getJwtToken: getTokenFromHeader, isAuthenticated: verifyToken, generateToken: generateToken };
