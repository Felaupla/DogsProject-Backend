const { Router } = require("express");
// Import routers;
const dogsRoute = require("./dogs-route");
const temperamentsRoute = require("./temperaments-route");

const router = Router();

// Configure routers
router.use("/dogs", dogsRoute);
router.use("/temperaments", temperamentsRoute);

module.exports = router;
