const { Car } = require("../models/Car");
const { Brand } = require("../models/Brand");
const { Model } = require("../models/Model");
const { Varient } = require("../models/Varient");
const { formatToJSON } = require("../helper/commonMethods");

const getAllCars = async (req, res) => {
  Car.belongsTo(Brand, {
    foreignKey: "brand_id",
  });
  Car.belongsTo(Model, {
    foreignKey: "model_id",
  });
  Car.belongsTo(Varient, {
    foreignKey: "varient_id",
  });
  try {
    let car = await Car.findAll({
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
      order: [["id", "DESC"]],
    });
    return res.status(200).json({
      success: true,
      car: car,
      total_counts: car?.length || 0,
      msg: "Car fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching Car:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAllCarPagination = async (req, res) => {
  Car.belongsTo(Brand, {
    foreignKey: "brand_id",
  });
  Car.belongsTo(Model, {
    foreignKey: "model_id",
  });
  Car.belongsTo(Varient, {
    foreignKey: "varient_id",
  });
  try {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);

    // Calculate the start and end indexes for the requested page
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    let car = formatToJSON(
      await Car.findAll({
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
        order: [["id", "DESC"]],
      })
    );
    const paginatedCars = car.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(car?.length / pageSize);

    return res.status(200).json({
      success: true,
      car: paginatedCars,
      total_counts: car?.length || 0,
      totalPages: totalPages,
      msg: "Cars fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching Cars:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getCarById = async (req, res) => {
  Car.belongsTo(Brand, {
    foreignKey: "brand_id",
  });
  Car.belongsTo(Model, {
    foreignKey: "model_id",
  });
  Car.belongsTo(Varient, {
    foreignKey: "varient_id",
  });
  try {
    let carData = formatToJSON(
      await Car.findOne({
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
        order: [["id", "DESC"]],
      })
    );
    return res.status(200).json({
      success: true,
      car: carData,
      msg: "Car fetched successfully",
    });
  } catch (error) {
    console.log("Error (while fetching Car):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to fetch Car",
    });
  }
};

const fetchCar = async (req, res) => {
  try {
    let allCars = await Car.findAll(
      {
        attributes: ["id", "car_id", "car_img"],
      },
      { where: { is_deleted: 0 }, order: [["id", "DESC"]] }
    );

    return res.status(200).json({
      success: true,
      allCars,
      msg: "cars fetched successfully",
    });
  } catch (error) {
    console.log("Error (while fetching cars):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to fetch cars",
    });
  }
};
const fetchactiveCar = async (req, res) => {
  try {
    let allCars = await Car.findAll({
      where: {
        status: 1,
      },
    });

    return res.status(200).json({
      success: true,
      allCars,
      msg: "cars fetched successfully",
    });
  } catch (error) {
    console.log("Error (while fetching cars):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to fetch cars",
    });
  }
};

const createCar = async (req, res) => {
  try {
    let {
      model_id,
      brand_id,
      varient_id,
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
    } = req.body;

    let carObj = {};
    carObj["model_id"] = model_id;
    carObj["brand_id"] = brand_id;
    carObj["varient_id"] = varient_id;
    carObj["kms_driven"] = kms_driven;
    carObj["ownership"] = ownership;
    carObj["manufacturing_year"] = manufacturing_year;
    carObj["registration_year"] = registration_year;
    carObj["registration_state"] = registration_state;
    carObj["car_location"] = car_location;
    carObj["registration_number"] = registration_number;
    carObj["insurance_validity"] = insurance_validity;
    carObj["ex_showroom"] = ex_showroom;
    carObj["price"] = price;
    carObj["car_description"] = car_description;
    carObj["status"] = status;
    if (req.files && req.files?.length > 0) {
      req.files?.forEach((item) => {
        if (item && item !== undefined) {
          console.log(item);
          if (process.env.MEDIA_LOCATION_S3 === "true") {
            if (item.location) {
              carObj[item.fieldname] = item.key;
            }
          } else {
            if (item.path) {
              carObj[item.fieldname] = item.path;
            }
          }
        } else if (req.body.image === "null") {
          //incase user wants to remove its image
          carObj[item.fieldname] = "";
        }
      });
    }
    let newCar = await Car.create({
      ...carObj,
    });

    return res.status(200).json({
      success: true,
      newCar,
      msg: "Car created successfully",
    });
  } catch (error) {
    console.log("Error (while creating car):", error);
    return res.status(500).json({
      success: false,
      msg: "Unable to create car",
    });
  }
};

const updateCar = async (req, res) => {
  try {
    let { id } = req.params;
    let carObj = {};
    let { car_name, status } = req.body;

    carObj["car_name"] = car_name;
    carObj["status"] = status;

    let updatedCar = await Car.update(
      {
        ...carObj,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      success: true,
      msg: "car updated successfully",
    });
  } catch (error) {
    console.log("Error (while updating car):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to update user",
    });
  }
};

const togglestatus = async (req, res) => {
  const id = req.params.id;

  try {
    const car = await Car.findByPk(id);

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    if (car.status == "0") {
      car.status = "1";
    } else {
      car.status = "0";
    }

    await car.save();

    res.json({
      message: "Status toggled successfully",
      updatedStatus: car.status,
    });
  } catch (error) {
    console.error("Error toggling car status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCarById = async (req, res) => {
  try {
    let { id } = req.params;

    let is_deleted = await Car?.update(
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
      throw new Error("Unable to delete car. Some error occured!");

    return res.status(200)?.json({
      success: true,
      msg: "car deleted successfully",
    });
  } catch (err) {
    console.log("Error (while deleting user):::", err);
    return res.status(404)?.json({
      success: false,
      msg: "Unable to delete car. Some error occured!",
    });
  }
};

module.exports = {
  getAllCarPagination,
  getAllCars,
  togglestatus,
  createCar,
  fetchCar,
  deleteCarById,
  fetchactiveCar,
  updateCar,
  getCarById,
};
