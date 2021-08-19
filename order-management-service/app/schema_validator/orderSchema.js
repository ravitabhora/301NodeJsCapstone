const Joi = require("joi");

const postOrder = {
    body: Joi.object({
        restId: Joi.string().required(),
        custId: Joi.string().required(),
        menuData: Joi.array().required().items({
            menuId : Joi.string().required(),
            quantity : Joi.number().required()
        }),
        paymentMethod: Joi.string().required(),
        address: Joi.object().required()        
    })
}

const updateOrder = {
    params: Joi.object({
        id:Joi.string().required()
    }),
    body: Joi.object({  
        menuData: Joi.array().required().items({
            menuId : Joi.string().required(),
            quantity : Joi.number().required()
        })     
    })
}

module.exports = {
    "postOrder" : postOrder,
    "updateOrder" : updateOrder
}