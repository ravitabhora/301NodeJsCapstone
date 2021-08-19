const RestaurantDetail = require('./models/restaurant-details');
const RestaurantMenu = require('./models/menu-details');

async function getRestaurantById(id) {
    const rest = await RestaurantDetail.findById(id);
    return rest;
}

async function getRestaurant(filter) {
    const rest = await RestaurantDetail.find(filter).exec();
    return rest;
}

async function getRestaurantMenuByRestaurantId(id) {
    const menuD = await RestaurantMenu.find({restaurant_id: id}).sort({cuisine: 1});
    return menuD;
}

async function updateRestaurantRating(restaurant_id, avg_rating, total_reviews) {
    const rest = await RestaurantDetail.findByIdAndUpdate(restaurant_id, 
        {total_reviews: total_reviews, avg_rating: avg_rating}).exec();
    return rest;
}

module.exports = {
    getRestaurantById,
    getRestaurant,
    getRestaurantMenuByRestaurantId,
    updateRestaurantRating
}