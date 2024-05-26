const brandController = require("../controllers/brandController");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
console.log("metadata file.fieldname", process.env.AWS_S3_BUCKET_NAME);

let fileUpload;
if (process.env.MEDIA_LOCATION_S3 == "true") {
  fileUpload = require("../middlewares/fileUploadS3");
} else {
  fileUpload = require("../middlewares/fileUpload");
}
router.get("/list", brandController.getAlBrandPagination);
router.get("/brand-list", brandController.getAllBrands);
router.post("/create-brand", fileUpload.any(), brandController.createNewBrand);
router.get("/fetch-brandbyid/:brandId", brandController.getBrandById);
router.patch(
  "/update-brand/:brandId",
  fileUpload.any(),
  brandController.updateBrandById
);
router.delete("/delete-brand/:brandId", brandController.deleteBrandById);
router.post("/toggle-status/:id", brandController.togglestatus);
module.exports = router;
