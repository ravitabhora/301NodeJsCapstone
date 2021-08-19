const express = require("express");
const router = express.Router();
const { orderRoute } = require("./v1/index")

router.use("/orders/", orderRoute);

module.exports = router;