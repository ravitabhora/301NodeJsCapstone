const mongoose = require('mongoose');

const RestaurantMenuSchema = mongoose.Schema({
    id: Number,
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RestaurantDetails'
    },
    cuisine: String,
    item: String,
    price: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('RestaurantMenu', RestaurantMenuSchema, 'menuDetails');