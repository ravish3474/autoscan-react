const varientController = require("../controllers/varientController");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

let fileUpload;
if (process.env.MEDIA_LOCATION_S3 === "true") {
  fileUpload = require("../middlewares/fileUploadS3");
} else {
  fileUpload = require("../middlewares/fileUpload");
}
router.get("/list", varientController.getAllVarientPagination);
router.get(
  "/fetch-varient-by-model/:modelId",
  varientController.getVarientBymodelId
);
router.get("/varient-list", varientController.getAllVarients);
router.get("/fetch-varient", varientController.fetchVarient);
router.get("/fetch-activeVarient", varientController.fetchactiveVarient);
router.get("/fetch-varient/:id", varientController.getVarientById);
router.post("/toggle-status/:id", varientController.togglestatus);
router.post(
  "/create-varient",
  fileUpload.any(),
  varientController.createVarient
);
router.delete("/delete-varient/:id", varientController.deleteVarientById);
router.patch(
  "/update-varient/:id",
  fileUpload.any(),
  varientController.updateVarient
);
module.exports = router;
