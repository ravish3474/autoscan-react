const modelController = require("../controllers/modelController");
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
router.get("/list", modelController.getAllModelPagination);
router.get("/fetch-model-by-brand/:brandId", modelController.getModelByBrandId);
router.get("/model-list", modelController.getAllModels);
router.get("/fetch-model", modelController.fetchModel);
router.get("/fetch-activeModel", modelController.fetchactiveModel);
router.get("/fetch-model/:id", modelController.getModelById);
router.post("/toggle-status/:id", modelController.togglestatus);
router.post("/create-model", fileUpload.any(), modelController.createModel);
router.delete("/delete-model/:id", modelController.deleteModelById);
router.patch(
  "/update-model/:id",
  fileUpload.any(),
  modelController.updateModel
);
module.exports = router;
