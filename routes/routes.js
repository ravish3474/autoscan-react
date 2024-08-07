const express = require("express");
const router = express.Router();

const AuthRoutes = require("./authRoutes.js");
const UserRoutes = require("./userRoutes.js");

const RoleRoutes = require("./roleRoutes.js");
const BrandRoutes = require("./brandRoutes.js");
const ModelRoutes = require("./modelRoutes.js");
const VarientRoutes = require("./varientRoutes.js");
const CarRoutes = require("./carRoutes.js");
const InspectionRoutes = require("./inspectionRoutes.js");
const CityRoutes = require("./cityRoutes.js");
const MakeOfferRoutes = require("./makeofferRoutes.js");
const RoadTaxRoutes = require("./RoadTaxRoutes.js");
const DealerRoutes = require("./dealerRoutes.js");
// customer routes
const AuthCustomerRoutes = require("./frontend/authRoutes.js");

router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);

router.use("/role", RoleRoutes);
router.use("/brand", BrandRoutes);
router.use("/model", ModelRoutes);
router.use("/varient", VarientRoutes);
router.use("/car", CarRoutes);
router.use("/inspection", InspectionRoutes);
router.use("/city", CityRoutes);
router.use("/offer", MakeOfferRoutes);
router.use("/calculate", RoadTaxRoutes);
//customer routes
router.use("/customer", AuthCustomerRoutes);
router.use("/dealer", DealerRoutes);
module.exports = router;
