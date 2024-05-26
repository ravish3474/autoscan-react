const masterDataController = require("../controllers/masterDataController");
const express = require("express");
const router = express.Router();

router.post("/get-all-master-data", masterDataController.getAllMasterData);
router.get("/get-master-data/:type", masterDataController.getMasterDataByName);

module.exports = router;
