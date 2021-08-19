const queue_name = "restaurant_reviews_service";

// rabbitMq connection
let open = require('amqplib/callback_api');

// bail if error
function bail(err) {
  console.error(err);
  process.exit(1);
}

function publisher(conn, details) {
  conn.createChannel(on_open);
  function on_open(err, ch) {
    if (err != null) bail(err);
    ch.assertQueue(queue_name);
    ch.sendToQueue(queue_name, Buffer.from(JSON.stringify(details)));
  }
}

const publish = (data) => {
    open.connect('amqps://ebnyzrfm:GKCqClWd5u5NBeJhL3lSGW7XJU0mRJrr@elk.rmq2.cloudamqp.com/ebnyzrfm' , function(err, conn) {
    if (err != null) bail(err);
    publisher(conn, data);
  })
}

module.exports = {
    "publish": publish
}