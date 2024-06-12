const { Makeoffer } = require("../models/Makeoffer");
const { Customer } = require("../models/frontend/Customer");
const { formatToJSON } = require("../helper/commonMethods");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const createmakeoffer = async (req, res) => {
  try {
    let {
      car_id,
      orginal_price,
      bid_price,
      car_addedby_user_id,
      car_addedby_dealer_id,
      bidding_user_id,
    } = req.body;
    console.log(req.body);
    let makeofferObj = {};
    makeofferObj["car_id"] = car_id;
    makeofferObj["orginal_price"] = orginal_price;
    makeofferObj["bid_price"] = bid_price;
    makeofferObj["car_addedby_user_id"] = car_addedby_user_id;
    makeofferObj["car_addedby_dealer_id"] = car_addedby_dealer_id;
    makeofferObj["bidding_user_id"] = bidding_user_id;

    let newbid = await Makeoffer.create({
      ...makeofferObj,
    });
    return res.status(200).json({
      success: true,
      newbid,
      msg: "Bidding done successfully",
    });
  } catch (error) {
    console.log("Error (while creating Bidding):", error);
    return res.status(500).json({
      success: false,
      msg: "Unable to create Bidding",
    });
  }
};

const getAllofferPagination = async (req, res) => {
  Makeoffer.belongsTo(Customer, {
    foreignKey: "bidding_user_id",
  });
  try {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);

    // Calculate the start and end indexes for the requested page
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    let bidding = formatToJSON(
      await Makeoffer.findAll({
        include: [
          {
            model: Customer,
            key: "id",
            attributes: ["name"],
          },
        ],
        where: {
          is_deleted: 0,
        },
      })
    );
    const paginatedBiddings = bidding.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(bidding?.length / pageSize);

    return res.status(200).json({
      success: true,
      bidding: paginatedBiddings,
      total_counts: bidding?.length || 0,
      totalPages: totalPages,
      msg: "Bidding fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching Bidding:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createmakeoffer,
  getAllofferPagination,
};
