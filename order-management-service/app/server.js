const app = require("./index.js");
// require('dotenv').config();

const PORT = process.env.DEV_APP_PORT || 8080;
app.listen(PORT, function() {
    console.log("app running: " + PORT);
})
