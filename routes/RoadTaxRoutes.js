const roadtaxController = require("../controllers/roadtaxController");
const express = require("express");
const router = express.Router();

router.post("/fetch-roadtax", roadtaxController.fetchroadtax);

module.exports = router;
