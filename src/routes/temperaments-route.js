const { Router } = require("express");
const { getAllTemperaments } = require("../services/temperaments-service.js");
const router = Router();

router.get("/", getAllTemperaments);

module.exports = router;
