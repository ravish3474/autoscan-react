const leadController = require("../controllers/leadStatusLogController");
const express = require("express");
const router = express.Router();

router.post("/create-lead-status-log", leadController.createLeadStatusLog);
router.get("/get-lead-logs/:id", leadController.getLeadStatusLogByLeadId);

module.exports = router;
