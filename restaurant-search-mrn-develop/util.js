const restData = require('./models/restaurant-data.json');
const faker = require('faker');
const restaurantDetails = require('./models/restaurant-details');
const restaurantMenu = require('./models/menu-details');

faker.seed(0);

getCuisine = (identifier) => {
    var retVal = [];
    switch (identifier) {
        case 1:
            retVal.push({ cuisine: 'Chinese', menu: restData.Chinese });
            break;
        case 2:
            retVal.push({ cuisine: 'Chinese', menu: restData.Chinese });
            retVal.push({ cuisine: 'Indian', menu: restData.Indian });
            break;
        case 3:
            retVal.push({ cuisine: 'Indian', menu: restData.Indian });
            retVal.push({ cuisine: 'Italian', menu: restData.Italian });
            break;
        case 4:
            retVal.push({ cuisine: 'Thai', menu: restData.Thai });
            break;
        case 5:
            retVal.push({ cuisine: 'Italian', menu: restData.Italian });
            break;
        case 6:
            retVal.push({ cuisine: 'Italian', menu: restData.Italian });
            retVal.push({ cuisine: 'Chinese', menu: restData.Chinese });
            break;
        case 7:
            retVal.push({ cuisine: 'Italian', menu: restData.Italian });
            retVal.push({ cuisine: 'Thai', menu: restData.Thai });
            break;
        case 8:
            retVal.push({ cuisine: 'Indian', menu: restData.Indian });
            retVal.push({ cuisine: 'Thai', menu: restData.Thai });
            break;
        case 9:
            retVal.push({ cuisine: 'Italian', menu: restData.Italian });
            retVal.push({ cuisine: 'Chinese', menu: restData.Chinese });
            break;
        case 10:
            retVal.push({ cuisine: 'Thai', menu: restData.Thai });
            retVal.push({ cuisine: 'Italian', menu: restData.Italian });
            retVal.push({ cuisine: 'Chinese', menu: restData.Chinese });
            break;
        default:
            retVal.push({ cuisine: 'Indian', menu: restData.Indian });
            break;
    }
    return retVal;
}

between = (min, max) => {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

createRestaurant = (ranNum, index) => {
    let address = faker.address;
    let cuisines = getCuisine(ranNum);
    let cuisineOnly = cuisines.map(a => a.cuisine);
    let mm = cuisines.map(a => a.menu);
    // let menuOnly = [].concat.apply([], mm);
    let modelObj = new restaurantDetails({
        id: index + 1001,
        name: faker.company.companyName(),
        phoneNumber: faker.phone.phoneNumber(),
        location: {
            lat: address.latitude(),
            long: address.longitude(),
            city: address.city(),
            state: address.state(),
            streetAddress: address.streetAddress(),
        },
        cuisines: cuisineOnly
    });
    return {modelObj, cuisines};
}

createMenu = (restaurantID, cuisine, item) => {
    let ranNum = between(1, 10000);
    let menuObject = new restaurantMenu({
        id: item.id + ranNum,
        restaurant_id: restaurantID,
        cuisine: cuisine,
        item: item.name,
        price: item.price
    });
    return menuObject;
}

generateRest = (toBeGenerated) => {
    let restaurants = [];
    for (let index = 0; index < toBeGenerated; index++) {
        let ranNum = between(1, 10);
        let restDetails = createRestaurant(ranNum, index);
        let menus = [];
        for (let cIndex = 0; cIndex < restDetails.cuisines.length; cIndex++) {
            const cuisine = restDetails.cuisines[cIndex];
            for(let mIndex = 0; mIndex < cuisine.menu.length; mIndex++) {
                let menuDetail = createMenu(restDetails.modelObj._id, cuisine.cuisine, cuisine.menu[mIndex])
                menus.push(menuDetail);
            }
        }
        restaurants.push({
            res: restDetails.modelObj,
            men: menus
        });
    }
    return restaurants;
}

module.exports.generateRestaurants = generateRest;