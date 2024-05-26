const permissionsController = require("../controllers/permissionsController");
const express = require("express");
const router = express.Router();


router.get("/fetch-permissions", permissionsController.fetchpermissions);

module.exports = router;
