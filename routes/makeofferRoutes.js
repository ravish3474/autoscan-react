const makeofferController = require("../controllers/makeofferController");
const express = require("express");
const router = express.Router();
let fileUpload;
if (process.env.MEDIA_LOCATION_S3 === "true") {
  fileUpload = require("../middlewares/fileUploadsS3");
} else {
  fileUpload = require("../middlewares/fileUpload");
}
router.post(
  "/make-offer",
  fileUpload.any(),
  makeofferController.createmakeoffer
);
router.get("/list", makeofferController.getAllofferPagination);
module.exports = router;
