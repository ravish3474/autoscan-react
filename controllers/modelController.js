const { Model } = require("../models/Model");
const { Brand } = require("../models/Brand");
const { formatToJSON } = require("../helper/commonMethods");

const getAllModels = async (req, res) => {
  Model.belongsTo(Brand, {
    foreignKey: 'brand_id'
});
  try {
    let models = JSON.parse(
      JSON.stringify(
        await Model.findAll({
          include: [
            {
              model: Brand,
              key: 'id',
              attributes: ['brand_name'],
            },
          ],
          attributes: [
            'id',
            'model_name',
            'model_year',
            'status',
          ],
          where: {
            is_deleted: 0,
          },
        })
      )
    );

    models = models.map(item => ({
      id: item.id,
      brand_name: item.Brand?.brand_name,
      model_name: item.model_name,
      model_year: item.model_year,
      status: item.status,
    }));
    res.status(200).json(models);
  } catch (error) {
    console.error("Error fetching models:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getModelById = async (req, res) => {
  try {
    let modelData = formatToJSON(
      await Model.findOne({
        where: { id: req.params?.id, is_deleted: 0 },
      })
    );
    return res.status(200).json({
      success: true,
      model: modelData,
      msg: "Model fetched successfully",
    });
  } catch (error) {
    console.log("Error (while fetching Model):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to fetch Model",
    });
  }
};

const fetchModel = async (req, res) => {
  try {
    let allModels = await Model.findAll(
      {
        attributes: ["id", "model_name"],
      },
      { where: { is_deleted: 0 } }
    );

    return res.status(200).json({
      success: true,
      allModels,
      msg: "models fetched successfully",
    });
  } catch (error) {
    console.log("Error (while fetching models):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to fetch models",
    });
  }
};
const fetchactiveModel = async (req, res) => {
  try {
    let allModels = await Model.findAll({
      where: {
        status: 1,
      },
    }
    );

    return res.status(200).json({
      success: true,
      allModels,
      msg: "models fetched successfully",
    });
  } catch (error) {
    console.log("Error (while fetching models):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to fetch models",
    });
  }
};

const createModel = async (req, res) => {
  try {

    let {
      brand_id,model_name,model_year,status
    } = req.body;

    let existingModel = await Model.findOne({
      where: { model_name },
    });

    if (existingModel) {
      return res.status(400).json({
        success: false,
        msg: "Model already exists. Unable to create a new model.",
      });
    }
    
    let modelObj = {};
    modelObj['brand_id'] = brand_id;
    modelObj['model_name'] = model_name;
    modelObj['model_year'] = model_year;
    modelObj['status'] = status;
    let newModel = await Model.create(
      {
        ...modelObj,
      });

    return res.status(200).json({
      success: true,
      newModel,
      msg: "Model created successfully",
    });
  } catch (error) {
    console.log("Error (while creating model):", error);
    return res.status(500).json({
      success: false,
      msg: "Unable to create model",
    });
  }
};

const updateModel = async (req, res) => {
  try {
    let { id } = req.params;
    let modelObj = {};
    let {
        brand_id,model_name,model_year,status
    } = req.body;

    modelObj['brand_id'] = brand_id;
    modelObj['model_name'] = model_name;
    modelObj['model_year'] = model_year;
    modelObj["status"] = status;

    let updatedModel = await Model.update(
      {
        ...modelObj,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      success: true,
      msg: "model updated successfully",
    });
  } catch (error) {
    console.log("Error (while updating model):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to update user",
    });
  }
};

const togglestatus = async (req, res) => {
  const id = req.params.id;

  try {
    const model = await Model.findByPk(id);

    if (!model) {
      return res.status(404).json({ error: "Model not found" });
    }
    if (model.status == "0") {
      model.status = "1";
    } else {
      model.status = "0";
    }

    await model.save();

    res.json({
      message: "Status toggled successfully",
      updatedStatus: model.status,
    });
  } catch (error) {
    console.error("Error toggling model status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteModelById = async (req, res) => {
  try {
    let { id } = req.params;

    let is_deleted = await Model?.update(
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
      throw new Error("Unable to delete model. Some error occured!");

    return res.status(200)?.json({
      success: true,
      msg: "model deleted successfully",
    });
  } catch (err) {
    console.log("Error (while deleting user):::", err);
    return res.status(404)?.json({
      success: false,
      msg: "Unable to delete model. Some error occured!",
    });
  }
};

module.exports = {
  getAllModels,
  togglestatus,
  createModel,
  fetchModel,
  deleteModelById,
  fetchactiveModel,
  updateModel,
  getModelById,
};
