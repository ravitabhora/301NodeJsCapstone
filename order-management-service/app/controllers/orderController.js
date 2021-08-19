const _ = require('lodash')
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const baseController = require('./baseController');

const logger = new Logger();
const requestHandler = new RequestHandler(logger);

class OrderController extends baseController{
    static async getOrder(req, res) {
        try{
            const order = await super.getById(req, 'Order');
            // const orders = _.omit(ordersList.dataValues, ['createdAt', 'updatedAt']);
			requestHandler.sendSuccess(res, 'Order has been successfuly fetched', 201)({ order });
        } catch(err) {
            requestHandler.sendError(req, res, err);
        }
    }
    static async postOrder(req, res) {
        try {
            let data = req.body;
            // let menuDetails = data.menuData; get details from rest services

            let orderData = {
                restId: data.restId,
                custId: data.custId,
                paymentMethod: data.paymentMethod,
                address: JSON.stringify(data.address),
                paybleAmount: 100.56,
            }
            const createdOrder = await super.create(req, 'Order', orderData);
            if (!(_.isNull(createdOrder))) {
                requestHandler.sendSuccess(res, 'Orders has been successfuly added', 201)();
			} else {
				requestHandler.throwError(422, 'Unprocessable Entity', 'unable to process the contained instructions')();
			}
           
        } catch (err) {
            requestHandler.sendError(req, res, err);
        }

    }

    static async listOrders(req, res) {
        try{
            const order = await super.getList(req, 'Order');
			requestHandler.sendSuccess(res, 'Orders list has been successfuly fetched', 201)({ order });
        } catch(err) {
            requestHandler.sendError(req, res, err);
        }
    }
    static async putOrder(req, res) {
        try{
            let data = req.body;
            // let menuDetails = data.details; get details from rest services

            let orderData = {
                paymentMethod: data.paymentMethod,
                address: JSON.stringify(data.address),
                paybleAmount: 130.56,
            }
          
            const updatedOrder = await super.updateById(req, 'Order', orderData);
            if (!(_.isNull(updatedOrder))) {
                requestHandler.sendSuccess(res, 'Orders has been successfuly updated', 201)();
            } else {
                requestHandler.throwError(422, 'Unprocessable Entity', 'unable to process the contained instructions')();
            }

        } catch(err) {
            requestHandler.sendError(req, res, err);
        }
    }
    static async deleteOrder(req, res) {
        try{
            await super.deleteById(req, 'Order');
			requestHandler.sendSuccess(res, 'Order deleted successfully', 201)();
        } catch(err) {
            requestHandler.sendError(req, res, err);
        }
    }

}

module.exports = OrderController;