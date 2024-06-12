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
//customer routes
router.use("/customer", AuthCustomerRoutes);

module.exports = router;
