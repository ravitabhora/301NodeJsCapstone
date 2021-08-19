const express = require('express');
const router = express.Router();

const {authRoute, restuarantRoute, reviewRoute, customerRoute, orderRoute} = require('../routes/serviceRoutes/index')

router.use("/auth/", authRoute);
router.use("/restuarants/", restuarantRoute);
router.use("/reviews/", reviewRoute);
router.use("/orders/", orderRoute);
router.use("/customers/", customerRoute);

module.exports = router;