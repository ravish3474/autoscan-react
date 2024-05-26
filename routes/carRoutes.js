const carController = require("../controllers/carController");
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

router.get("/list", carController.getAlCarPagination);
router.get("/Car-list", carController.getAllCars);
router.get("/fetch-Car", carController.fetchCar);
router.get("/fetch-activeCar", carController.fetchactiveCar);
router.get("/fetch-Car/:id", carController.getCarById);
router.post("/toggle-status/:id", carController.togglestatus);
router.post("/create-Car", fileUpload.any(), carController.createCar);
router.delete("/delete-Car/:id", carController.deleteCarById);
router.patch("/update-Car/:id", fileUpload.any(), carController.updateCar);
module.exports = router;
