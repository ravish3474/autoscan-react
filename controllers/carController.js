const { Car } = require("../models/Car");
const { Brand } = require("../models/Brand");
const { Model } = require("../models/Model");
const { Varient } = require("../models/Varient");
const { Cities } = require("../models/Cities");
const { formatToJSON } = require("../helper/commonMethods");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const getAllCars = async (req, res) => {
  let { brand = "", kms_driven, min_price, max_price,search_text } = req.query;
  let where_query = {
    status: 1,is_deleted:0
  };

  if (brand) {
    where_query.brand_id = {
      [Op.in]: brand.split(","),
    };
  }

  if (kms_driven) {
    where_query.kms_driven = {
      [Op.gte]: parseInt(kms_driven), // Greater than or equal to kms_driven
    };
  }

  if (min_price && max_price) {
    where_query.price = {
      [Op.between]: [parseInt(min_price), parseInt(max_price)], // Price between min_price and max_price
    };
  } else if (min_price) {
    where_query.price = {
      [Op.gte]: parseInt(min_price), // Price greater than or equal to min_price
    };
  } else if (max_price) {
    where_query.price = {
      [Op.lte]: parseInt(max_price), // Price less than or equal to max_price
    };
  }

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
    let car;
    if (search_text) {
      car = await Car.findAll({
        include: [
          {
            model: Brand,
            key: "id",
            attributes: ["brand_name"],
          },
          {
            model: Model,
            key: "id",
            attributes: ["model_name", "car_img"],
            where: {
              model_name: {
                [Op.like]: `%${search_text}%`
              }
            }
          },
          {
            model: Varient,
            key: "id",
            attributes: ["varient_name"],
          },
        ],
        where: where_query,
        order: [["id", "DESC"]],
      });
    } else {
      car = await Car.findAll({
        include: [
          {
            model: Brand,
            key: "id",
            attributes: ["brand_name"],
          },
          {
            model: Model,
            key: "id",
            attributes: ["model_name", "car_img"],
          },
          {
            model: Varient,
            key: "id",
            attributes: ["varient_name"],
          },
        ],
        where: where_query,
        order: [["id", "DESC"]],
      });
    }
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
      current_location,
      pincode,
      kms_driven,
      ownership,
      manufacturing_year,
      registration_state,
      registration_number,
      price,
      car_description,
      car_addedby_user_id,
      car_addedby_dealer_id,
      status,
      engine_transmission,
      dimension,
      weight,
      capacity,
      suspensions,
      breaks,
      streering_tires
    } = req.body;
    const existingCar = await Car.findOne({  where: {
      registration_number: registration_number,
    }, });
    if (existingCar) {
      return res.status(400).json({
        success: false,
        msg: "Registration number already exists",
      });
    }
    let carObj = {};
    if (current_location) {
      carObj["current_location"] = current_location;
    }
    if (engine_transmission) {
      carObj["engine_transmission"] = engine_transmission;
    }
    if (dimension) {
      carObj["dimension"] = dimension;
    }
    if (weight) {
      carObj["weight"] = weight;
    }
    if (capacity) {
      carObj["capacity"] = capacity;
    }
    if (suspensions) {
      carObj["suspensions"] = suspensions;
    }
    if (breaks) {
      carObj["breaks"] = breaks;
    }
    if (streering_tires) {
      carObj["streering_tires"] = streering_tires;
    }
    if (car_addedby_dealer_id) {
      carObj["car_addedby_dealer_id"] = car_addedby_dealer_id;
    }
    if (car_addedby_user_id) {
      carObj["car_addedby_user_id"] = car_addedby_user_id;
    }
    carObj["model_id"] = model_id;
    carObj["brand_id"] = brand_id;
    carObj["varient_id"] = varient_id;
    carObj["pincode"] = pincode;
    carObj["kms_driven"] = kms_driven;
    carObj["ownership"] = ownership;
    carObj["manufacturing_year"] = manufacturing_year;
    carObj["registration_state"] = registration_state;
    carObj["registration_number"] = registration_number;
    carObj["price"] = price;
    carObj["car_description"] = car_description;
    carObj["status"] = status;
    if (req.files && req.files?.length > 0) {
      req.files?.forEach((item) => {
        if (item && item !== undefined) {
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
    console.log(error)
    return res.status(500).json({
      success: false,
      msg: "Unable to create car",
    });
  }
};

const updateCar = async (req, res) => {
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
      registration_state,
      registration_number,
      price,
      car_description,
      car_addedby_user_id,
      car_addedby_dealer_id,
      status,
      engine_transmission,
      dimension,
      weight,
      capacity,
      suspensions,
      breaks,
      streering_tires
    } = req.body;

    let carObj = {};
    if (current_location) {
      carObj["current_location"] = current_location;
    }
    if (engine_transmission) {
      carObj["engine_transmission"] = engine_transmission;
    }
    if (dimension) {
      carObj["dimension"] = dimension;
    }
    if (weight) {
      carObj["weight"] = weight;
    }
    if (capacity) {
      carObj["capacity"] = capacity;
    }
    if (suspensions) {
      carObj["suspensions"] = suspensions;
    }
    if (breaks) {
      carObj["breaks"] = breaks;
    }
    if (streering_tires) {
      carObj["streering_tires"] = streering_tires;
    }
    if (car_addedby_dealer_id) {
      carObj["car_addedby_dealer_id"] = car_addedby_dealer_id;
    }
    if (car_addedby_user_id) {
      carObj["car_addedby_user_id"] = car_addedby_user_id;
    }
    carObj["model_id"] = model_id;
    carObj["brand_id"] = brand_id;
    carObj["varient_id"] = varient_id;
    carObj["pincode"] = pincode;
    carObj["kms_driven"] = kms_driven;
    carObj["ownership"] = ownership;
    carObj["manufacturing_year"] = manufacturing_year;
    carObj["registration_state"] = registration_state;
    carObj["registration_number"] = registration_number;
    carObj["price"] = price;
    carObj["car_description"] = car_description;
    carObj["status"] = status;
    if (req.files && req.files?.length > 0) {
      req.files?.forEach((item) => {
        if (item && item !== undefined) {
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
