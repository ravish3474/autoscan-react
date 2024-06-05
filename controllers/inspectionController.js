const { Inspection } = require("../models/Inspection");
const { Brand } = require("../models/Brand");
const { Model } = require("../models/Model");
const { Varient } = require("../models/Varient");
const { formatToJSON } = require("../helper/commonMethods");

const getAllInspections = async (req, res) => {
  Inspection.belongsTo(Brand, {
    foreignKey: "brand_id",
  });
  Inspection.belongsTo(Model, {
    foreignKey: "model_id",
  });
  Inspection.belongsTo(Varient, {
    foreignKey: "varient_id",
  });
  try {
    let inspection = await Inspection.findAll({
      include: [
        {
          model: Brand,
          key: "id",
          attributes: ["brand_name"],
        },
        {
          model: Model,
          key: "id",
          attributes: ["model_name"],
        },
        {
          model: Varient,
          key: "id",
          attributes: ["varient_name"],
        },
      ],
      where: {
        is_deleted: 0,
      },
    });
    return res.status(200).json({
      success: true,
      inspection: inspection,
      total_counts: inspection?.length || 0,
      msg: "Inspection fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching Inspection:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAlInspectionPagination = async (req, res) => {
  Inspection.belongsTo(Brand, {
    foreignKey: "brand_id",
  });
  Inspection.belongsTo(Model, {
    foreignKey: "model_id",
  });
  Inspection.belongsTo(Varient, {
    foreignKey: "varient_id",
  });
  try {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);

    // Calculate the start and end indexes for the requested page
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    let inspection = formatToJSON(
      await Inspection.findAll({
        include: [
          {
            model: Brand,
            key: "id",
            attributes: ["brand_name"],
          },
          {
            model: Model,
            key: "id",
            attributes: ["model_name"],
          },
          {
            model: Varient,
            key: "id",
            attributes: ["varient_name"],
          },
        ],
        where: {
          is_deleted: 0,
        },
      })
    );
    const paginatedInspections = inspection.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(inspection?.length / pageSize);

    return res.status(200).json({
      success: true,
      inspection: paginatedInspections,
      total_counts: inspection?.length || 0,
      totalPages: totalPages,
      msg: "Inspections fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching Inspections:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getInspectionById = async (req, res) => {
  Inspection.belongsTo(Brand, {
    foreignKey: "brand_id",
  });
  Inspection.belongsTo(Model, {
    foreignKey: "model_id",
  });
  Inspection.belongsTo(Varient, {
    foreignKey: "varient_id",
  });
  try {
    let inspectionData = formatToJSON(
      await Inspection.findOne({
        include: [
          {
            model: Brand,
            key: "id",
            attributes: ["brand_name"],
          },
          {
            model: Model,
            key: "id",
            attributes: ["model_name"],
          },
          {
            model: Varient,
            key: "id",
            attributes: ["varient_name"],
          },
        ],
        where: { id: req.params?.id, is_deleted: 0 },
      })
    );
    return res.status(200).json({
      success: true,
      inspection: inspectionData,
      msg: "Inspection fetched successfully",
    });
  } catch (error) {
    console.log("Error (while fetching Inspection):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to fetch Inspection",
    });
  }
};

const fetchInspection = async (req, res) => {
  try {
    let allInspections = await Inspection.findAll(
      {
        attributes: ["id", "inspection_id", "inspection_img"],
      },
      { where: { is_deleted: 0 } }
    );

    return res.status(200).json({
      success: true,
      allInspections,
      msg: "inspections fetched successfully",
    });
  } catch (error) {
    console.log("Error (while fetching inspections):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to fetch inspections",
    });
  }
};
const fetchactiveInspection = async (req, res) => {
  try {
    let allInspections = await Inspection.findAll({
      where: {
        status: 1,
      },
    });

    return res.status(200).json({
      success: true,
      allInspections,
      msg: "inspections fetched successfully",
    });
  } catch (error) {
    console.log("Error (while fetching inspections):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to fetch inspections",
    });
  }
};

const createInspection = async (req, res) => {
  try {
    let {
      model_id,
      brand_id,
      varient_id,
      current_location,
      pincode,
      kms_driven,
      ownership,
      manufacturing_year,
      registration_year,
      registration_state,
      car_location,
      registration_number,
      insurance_validity,
      ex_showroom,
      price,
      car_description,
      status,
      inspection_address,
      inspection_area,
      inspection_landmark,
      inspection_date,
      inspection_time,
      whatsapp_update,
    } = req.body;

    let inspectionObj = {};
    inspectionObj["model_id"] = model_id;
    inspectionObj["brand_id"] = brand_id;
    inspectionObj["varient_id"] = varient_id;
    inspectionObj["current_location"] = current_location;
    inspectionObj["pincode"] = pincode;
    inspectionObj["kms_driven"] = kms_driven;
    inspectionObj["ownership"] = ownership;
    inspectionObj["manufacturing_year"] = manufacturing_year;
    inspectionObj["registration_year"] = registration_year;
    inspectionObj["registration_state"] = registration_state;
    inspectionObj["car_location"] = car_location;
    inspectionObj["registration_number"] = registration_number;
    inspectionObj["insurance_validity"] = insurance_validity;
    inspectionObj["ex_showroom"] = ex_showroom;
    inspectionObj["price"] = price;
    inspectionObj["car_description"] = car_description;
    inspectionObj["inspection_address"] = inspection_address;
    inspectionObj["inspection_area"] = inspection_area;
    inspectionObj["inspection_landmark"] = inspection_landmark;
    inspectionObj["inspection_date"] = inspection_date;
    inspectionObj["inspection_time"] = inspection_time;
    inspectionObj["whatsapp_update"] = whatsapp_update;
    inspectionObj["status"] = status;
    let newInspection = await Inspection.create({
      ...inspectionObj,
    });

    return res.status(200).json({
      success: true,
      newInspection,
      msg: "Inspection created successfully",
    });
  } catch (error) {
    console.log("Error (while creating inspection):", error);
    return res.status(500).json({
      success: false,
      msg: "Unable to create inspection",
    });
  }
};

const updateInspection = async (req, res) => {
  try {
    let { id } = req.params;
    let {
      model_id,
      brand_id,
      varient_id,
      current_location,
      pincode,
      kms_driven,
      ownership,
      manufacturing_year,
      registration_year,
      registration_state,
      car_location,
      registration_number,
      insurance_validity,
      ex_showroom,
      price,
      car_description,
      status,
      inspection_address,
      inspection_area,
      inspection_landmark,
      inspection_date,
      inspection_time,
      whatsapp_update,
    } = req.body;

    let inspectionObj = {};
    inspectionObj["model_id"] = model_id;
    inspectionObj["brand_id"] = brand_id;
    inspectionObj["varient_id"] = varient_id;
    inspectionObj["current_location"] = current_location;
    inspectionObj["pincode"] = pincode;
    inspectionObj["kms_driven"] = kms_driven;
    inspectionObj["ownership"] = ownership;
    inspectionObj["manufacturing_year"] = manufacturing_year;
    inspectionObj["registration_year"] = registration_year;
    inspectionObj["registration_state"] = registration_state;
    inspectionObj["car_location"] = car_location;
    inspectionObj["registration_number"] = registration_number;
    inspectionObj["insurance_validity"] = insurance_validity;
    inspectionObj["ex_showroom"] = ex_showroom;
    inspectionObj["price"] = price;
    inspectionObj["car_description"] = car_description;
    inspectionObj["inspection_address"] = inspection_address;
    inspectionObj["inspection_area"] = inspection_area;
    inspectionObj["inspection_landmark"] = inspection_landmark;
    inspectionObj["inspection_date"] = inspection_date;
    inspectionObj["inspection_time"] = inspection_time;
    inspectionObj["whatsapp_update"] = whatsapp_update;
    inspectionObj["status"] = status;

    let updatedInspection = await Inspection.update(
      {
        ...inspectionObj,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      success: true,
      msg: "inspection updated successfully",
    });
  } catch (error) {
    console.log("Error (while updating inspection):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to update user",
    });
  }
};

const togglestatus = async (req, res) => {
  const id = req.params.id;

  try {
    const inspection = await Inspection.findByPk(id);

    if (!inspection) {
      return res.status(404).json({ error: "Inspection not found" });
    }
    if (inspection.status == "0") {
      inspection.status = "1";
    } else {
      inspection.status = "0";
    }

    await inspection.save();

    res.json({
      message: "Status toggled successfully",
      updatedStatus: inspection.status,
    });
  } catch (error) {
    console.error("Error toggling inspection status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteInspectionById = async (req, res) => {
  try {
    let { id } = req.params;

    let is_deleted = await Inspection?.update(
      {
        is_deleted: 1,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (!is_deleted)
      throw new Error("Unable to delete inspection. Some error occured!");

    return res.status(200)?.json({
      success: true,
      msg: "inspection deleted successfully",
    });
  } catch (err) {
    console.log("Error (while deleting user):::", err);
    return res.status(404)?.json({
      success: false,
      msg: "Unable to delete inspection. Some error occured!",
    });
  }
};

module.exports = {
  getAlInspectionPagination,
  getAllInspections,
  togglestatus,
  createInspection,
  fetchInspection,
  deleteInspectionById,
  fetchactiveInspection,
  updateInspection,
  getInspectionById,
};
