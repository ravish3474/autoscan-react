const cityController = require("../controllers/cityController");
const express = require("express");
const router = express.Router();

router.get("/fetch-city", cityController.fetchCity);
router.get(
  "/fetch-pincode-by-city/:cityName",
  cityController.getPincodeByCityId
);

module.exports = router;
