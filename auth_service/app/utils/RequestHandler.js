const _ = require('lodash');

class RequestHandler {
	constructor(logger) {
		this.logger = logger;
	}

	throwIf(fn, status, errorType, errorMessage) {
		return result => ( fn(result) ? this.throwError(status, errorType, errorMessage)() : result);
	}

	validateJoi(err, status, errorType, errorMessage, errorDetail = '', res) {
		if (err) { this.logger.log(`error in validating request : ${errorMessage}`, 'warn'); }
		return !_.isNull(err) ? this.throwError(status, errorType, errorMessage, errorDetail, res)() : '';
	}

	throwError(status, errorType, errorMessage, errorDetail = '', res = '') {
		if (errorDetail) {
			return res.status(400).json({
				type: 'error',
				message: errorMessage || 'Validation Error',
				errors: { errorDetail }
			});
		}

		return (e) => {
			if (!e) e = new Error(errorMessage || 'Default Error');
			e.status = status;
			e.errorType = errorType;
			throw e;
		};
	}
	throwAuthError(status, errorType, errorMessage) {
		return (e) => {
			if (!e) e = new Error(errorMessage || 'Default Error');
			e.auth = false;
			e.status = status;
			e.errorType = errorType;
			throw e;
		};
	}

	catchError(res, error) {
		if (!error) error = new Error('Default error');
		res.status(error.status || 500).json({ type: 'error', message: error.message || 'Unhandled error', error });
	}

	sendSuccess(res, message, status) {
		this.logger.log(`a request has been made and proccessed successfully at: ${new Date()}`, 'info');
		return (data, globalData) => {
			if (_.isUndefined(status)) {
				status = 200;
			}
			res.status(status).json({
				type: 'success', message: message || 'Success result', data, ...globalData,
			});
		};
	}

	sendError(req, res, error) {
		this.logger.log(`error ,Error during processing request: ${`${req.protocol}://${req.get('host')}${req.originalUrl}`} details message: ${error.message}`, 'error');
		if(error.errorType == 'Unauthorized') {
			return res.status(error.status || 500).json({
				type: 'error', message: 'You are not authorise to access this resource',
			});
		} else {
			return res.status(error.status || 500).json({
				type: 'error', message: 'Invalid Details', error,
			});
		}
		
	}
}
module.exports = RequestHandler;
