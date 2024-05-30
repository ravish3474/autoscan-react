const { Varient } = require("../models/Varient");
const { Brand } = require("../models/Brand");
const { Model } = require("../models/Model");
const { formatToJSON } = require("../helper/commonMethods");

// Define associations
const getAllVarientPagination = async (req, res) => {
  Varient.belongsTo(Brand, {
    foreignKey: "brand_id",
  });
  Varient.belongsTo(Model, {
    foreignKey: "model_id",
  });

  try {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);

    // Calculate the start and end indexes for the requested page
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    let varient = formatToJSON(
      await Varient.findAll({
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
        ],
        where: {
          is_deleted: 0,
        },
        order: [["id", "DESC"]],
      })
    );
    const paginatedVarients = varient.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(varient?.length / pageSize);

    return res.status(200).json({
      success: true,
      varient: paginatedVarients,
      total_counts: varient?.length || 0,
      totalPages: totalPages,
      msg: "Varients fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching Varients:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAllVarients = async (req, res) => {
  Varient.belongsTo(Brand, {
    foreignKey: "brand_id",
  });
  Varient.belongsTo(Model, {
    foreignKey: "model_id",
  });

  try {
    let varients = JSON.parse(
      JSON.stringify(
        await Varient.findAll({
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
          ],
          attributes: ["id", "varient_name", "status"],
          where: {
            is_deleted: 0,
          },
        })
      )
    );
    varients = varients.map((item) => ({
      id: item.id,
      brand: item.Brand?.brand_name,
      model: item.model?.model_name,
      varient_name: item.varient_name,
      status: item.status,
    }));

    res.status(200).json(varients);
  } catch (error) {
    console.error("Error fetching varients:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getVarientBymodelId = async (req, res) => {
  try {
    const varientData = await Varient.findAll({
      where: { model_id: req.params?.modelId, is_deleted: 0 },
    });
    return res.status(200).json({
      success: true,
      varientData,
      allVarients: varientData,
      msg: "Model fetched successfully",
    });
  } catch (error) {
    console.log("Error (while fetching Varient):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to fetch Varient",
    });
  }
};
const getVarientById = async (req, res) => {
  try {
    let varientData = formatToJSON(
      await Varient.findOne({
        where: { id: req.params?.id, is_deleted: 0 },
      })
    );
    return res.status(200).json({
      success: true,
      varient: varientData,
      msg: "Varient fetched successfully",
    });
  } catch (error) {
    console.log("Error (while fetching Varient):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to fetch Varient",
    });
  }
};

const fetchVarient = async (req, res) => {
  try {
    let allVarients = await Varient.findAll(
      {
        attributes: ["id", "varient_name"],
      },
      { where: { is_deleted: 0, status: 1 } }
    );

    return res.status(200).json({
      success: true,
      allVarients,
      msg: "varients fetched successfully",
    });
  } catch (error) {
    console.log("Error (while fetching varients):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to fetch varients",
    });
  }
};
const fetchactiveVarient = async (req, res) => {
  try {
    let allVarients = await Varient.findAll({
      where: {
        status: 1,
      },
    });

    return res.status(200).json({
      success: true,
      allVarients,
      msg: "varients fetched successfully",
    });
  } catch (error) {
    console.log("Error (while fetching varients):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to fetch varients",
    });
  }
};

const createVarient = async (req, res) => {
  try {
    let { brand_id, model_id, varient_name, status } = req.body;

    let existingVarient = await Varient.findOne({
      where: { varient_name },
    });

    if (existingVarient) {
      return res.status(400).json({
        success: false,
        msg: "Varient already exists. Unable to create a new varient.",
      });
    }

    let varientObj = {};
    varientObj["brand_id"] = brand_id;
    varientObj["model_id"] = model_id;
    varientObj["varient_name"] = varient_name;
    varientObj["status"] = status;
    let newVarient = await Varient.create({
      ...varientObj,
    });

    return res.status(200).json({
      success: true,
      newVarient,
      msg: "Varient created successfully",
    });
  } catch (error) {
    console.log("Error (while creating varient):", error);
    return res.status(500).json({
      success: false,
      msg: "Unable to create varient",
    });
  }
};

const updateVarient = async (req, res) => {
  try {
    let { id } = req.params;
    let varientObj = {};
    let { brand_id, model_id, varient_name, status } = req.body;

    varientObj["brand_id"] = brand_id;
    varientObj["model_id"] = model_id;
    varientObj["varient_name"] = varient_name;
    varientObj["status"] = status;

    let updatedVarient = await Varient.update(
      {
        ...varientObj,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      success: true,
      msg: "varient updated successfully",
    });
  } catch (error) {
    console.log("Error (while updating varient):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to update user",
    });
  }
};

const togglestatus = async (req, res) => {
  const id = req.params.id;

  try {
    const varient = await Varient.findByPk(id);

    if (!varient) {
      return res.status(404).json({ error: "Varient not found" });
    }
    if (varient.status == "0") {
      varient.status = "1";
    } else {
      varient.status = "0";
    }

    await varient.save();

    res.json({
      message: "Status toggled successfully",
      updatedStatus: varient.status,
    });
  } catch (error) {
    console.error("Error toggling varient status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteVarientById = async (req, res) => {
  try {
    let { id } = req.params;

    let is_deleted = await Varient?.update(
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
      throw new Error("Unable to delete varient. Some error occured!");

    return res.status(200)?.json({
      success: true,
      msg: "varient deleted successfully",
    });
  } catch (err) {
    console.log("Error (while deleting user):::", err);
    return res.status(404)?.json({
      success: false,
      msg: "Unable to delete varient. Some error occured!",
    });
  }
};

module.exports = {
  getAllVarientPagination,
  getVarientBymodelId,
  getAllVarients,
  togglestatus,
  createVarient,
  fetchVarient,
  deleteVarientById,
  fetchactiveVarient,
  updateVarient,
  getVarientById,
};
