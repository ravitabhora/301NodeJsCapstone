const mongoose = require('mongoose');

const RestaurantDetailsSchema = mongoose.Schema({
    id: Number,
    name: String,
    phoneNumber: Number,
    location: {
        lat: Number,
        long: Number,
        city: String,
        state: String,
        streetAddress: String,
    },
    cuisines: [String],
    menu: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RestaurantMenu'
    }],
    avg_rating: Number,
    total_reviews: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('RestaurantDetail', RestaurantDetailsSchema, 'restaurantDetails');