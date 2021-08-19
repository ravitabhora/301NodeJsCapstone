const util = require('./util');
let x = util.generateRestaurants(10000);

let restaurants = x.map(m => m.res);
let menus = x.map(m => m.men);
let menuOnly = [].concat.apply([], menus);

const { MongoClient } = require('mongodb');
const uri = '';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async err => {
    const db = await client.db("restaurantSearch");
    const collection = await db.collection("restaurantDetails");
    let result = await collection.insertMany(restaurants)
    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);

    const menuCollection = await db.collection("menuDetails");
    let menuResult = await menuCollection.insertMany(menuOnly)
    console.log(`${menuResult.insertedCount} new listing(s) created with the following id(s):`);
    console.log(menuResult.insertedIds);

    client.close();
});


