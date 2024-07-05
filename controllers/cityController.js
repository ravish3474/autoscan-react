const { CityPincode } = require("../models/CityPincode");
const { Sequelize } = require("sequelize"); // Import Sequelize to use its functions
const sequelize = require("../config/connection"); // Adjust the path as needed

const getPincodeByCityId = async (req, res) => {
  try {
    const cityData = await CityPincode.findAll({
      where: { city: req.params?.cityName, is_deleted: 0 },
    });
    return res.status(200).json({
      success: true,
      allpincodes: cityData,
      msg: "Pincode fetched successfully",
    });
  } catch (error) {
    console.log("Error (while fetching Pincode):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to fetch Pincode",
    });
  }
};

const fetchCity = async (req, res) => {
  try {
    let allcities = await CityPincode.findAll({
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("city")), "city"]],
      where: { is_deleted: 0 },
      order: [["city", "ASC"]],
    });

    return res.status(200).json({
      success: true,
      allcities,
      msg: "City fetched successfully",
    });
  } catch (error) {
    console.log("Error (while fetching City):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to fetch City",
    });
  }
};

module.exports = {
  getPincodeByCityId,
  fetchCity,
};
