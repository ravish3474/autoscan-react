const roleController = require("../controllers/roleController");
const express = require("express");
const router = express.Router();

router.get("/role-list", roleController.getAllRoles);
router.get("/fetch-role", roleController.fetchroles);
router.get("/fetch-activerole", roleController.fetchactiveroles);
router.get("/get-role/:id",roleController.getRoleById);
router.post("/toggle-status/:id", roleController.togglestatus);
router.post("/create-role", roleController.createRole);
router.delete("/delete-role/:id", roleController.deleteRoleById);
router.patch("/update-role/:id", roleController.updateRole);
module.exports = router;
