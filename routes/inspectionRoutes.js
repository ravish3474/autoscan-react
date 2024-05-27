const inspectionController = require("../controllers/inspectionController");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

let fileUpload;
if (process.env.MEDIA_LOCATION_S3 === "true") {
  fileUpload = require("../middlewares/fileUploadsS3");
} else {
  fileUpload = require("../middlewares/fileUpload");
}

router.get("/list", inspectionController.getAlInspectionPagination);
router.get("/Inspection-list", inspectionController.getAllInspections);
router.get("/fetch-Inspection", inspectionController.fetchInspection);
router.get(
  "/fetch-activeInspection",
  inspectionController.fetchactiveInspection
);
router.get("/fetch-Inspection/:id", inspectionController.getInspectionById);
router.post("/toggle-status/:id", inspectionController.togglestatus);
router.post(
  "/create-Inspection",
  fileUpload.any(),
  inspectionController.createInspection
);
router.delete(
  "/delete-Inspection/:id",
  inspectionController.deleteInspectionById
);
router.patch(
  "/update-Inspection/:id",
  fileUpload.any(),
  inspectionController.updateInspection
);
module.exports = router;
