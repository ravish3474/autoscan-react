const leadController = require("../controllers/leadController");
const express = require("express");
const router = express.Router();

router.get("/lead-list", leadController.getAllLeads);
router.get("/list", leadController.getAllLeadsPagination);
router.post("/filter", leadController.getFilteredData);
router.get("/get-lead/:id", leadController.getLeadById);

router.post("/create-lead", leadController.createLead);
router.patch("/update-lead/:id", leadController.updateLead);
router.delete("/delete-lead/:id", leadController.deleteLeadById);

module.exports = router;
