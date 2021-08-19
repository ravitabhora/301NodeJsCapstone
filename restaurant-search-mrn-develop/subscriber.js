const queue_name = "restaurant_reviews_service";
const dal = require('./data-access-layer');
var reviewdata = {};
// rabbitMq connection
let open = require('amqplib/callback_api');

// bail if error
function bail(err) {
  console.error(err);
  process.exit(1);
}

function subscriber(conn) {
  var ok = conn.createChannel(on_open);
  function on_open(err, ch) {
    if (err != null) bail(err);
    ch.assertQueue(queue_name);
    ch.consume(queue_name, function (msg) {
      if (msg !== null) {
        // dal.updateRestaurantRating(requestBody.restaurant_id, requestBody.avg_rating, requestBody.total_reviews)
        console.log(msg.content.toString());
        ch.ack(msg);
      }
    });
  }
}

const subscribe = async () => {
  return open.connect('amqps://ebnyzrfm:GKCqClWd5u5NBeJhL3lSGW7XJU0mRJrr@elk.rmq2.cloudamqp.com/ebnyzrfm', async function (err, conn) {
    if (err != null) bail(err);
    subscriber(conn);

  })
}

module.exports = {
  "subscribe": subscribe
}