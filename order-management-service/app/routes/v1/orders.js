const express = require("express");
const router = express.Router();
const orders = require("../../controllers/orderController")
const { postOrder, updateOrder } = require("../../schema_validator/orderSchema")
const validator = require("../../utils/validationMiddleware")

/**
* @swagger
* components:
*  schemas:
*    order:
*      type: object
*      required:
*        - restId
*        - custId
*        - menuData
*        - address
*        - paymentMethod
*      properties:
*        restId:
*          type: string
*        custId:
*          type: string
*        menuData: 
*          type: array
*          schema:
*            $ref : '#/components/schemas/menu'
*        address: 
*          type: object
*        paymentMethod:
*          type: string    
* 
*/


/**
* @swagger
* components:
*  schemas:
*    menu:
*      type: object
*      required:
*        - menuId
*        - quantity
*      properties:
*        menuId:
*          type: string
*        quantity:
*          type: number
*/

/**
* @swagger
* components:
*  requestBody:
*    menu:
*      type: object
*      required:
*        - menuId
*        - quantity
*      properties:
*        menuId:
*          type: string
*        quantity:
*          type: number
*/



/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags:
 *       - orders
 *     description: Return all orders
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: all orders object
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/order'
 */
router.get('/', orders.listOrders);


/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags:
 *       - orders
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json: 
 *           schema:
 *             $ref: '#/components/schemas/order'
 *           example:
 *             restId: aB3461233231
 *             custId: dJsdhfj34237
 *             menuData: [{menuId: 347jhsfsd, quantity: 2}]
 *             paymentMethod: paytm
 *             address: {city: delhi, state: delhi, address: abc extension} 
 *     responses:
 *       200:
 *         description: order details successfully saved
 *         schema:
 *           $ref: '#/components/schemas/order'
 */

router.post('/', validator(true, postOrder), orders.postOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     tags:
 *       - orders
 *     description: Return one order by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true 
 *     responses:
 *       200:
 *         description: order detail
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/order'
 */
router.get('/:id', orders.getOrder);


/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     tags:
 *       - orders
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true   
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json: 
 *           schema:
 *             $ref: '#/components/schemas/order'
 *           example:
 *             menuData: [{menuId: 347jhsfsd, quantity: 2}]
 *             paymentMethod: paytm
 *             address: {city: delhi, state: delhi, address: abc extension} 
 *     responses:
 *       200:
 *         description: order details successfully updated
 *         schema:
 *           $ref: '#/components/schemas/order'
 */
router.put('/:id', validator(true, updateOrder), orders.putOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     tags:
 *       - orders
 *     description: delete an order by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true 
 *     responses:
 *       200:
 *         description: order deleted succesfully
 *         schema:
 *           $ref: '#/components/schemas/order'
 */
router.delete('/:id', orders.deleteOrder);

module.exports = router;

