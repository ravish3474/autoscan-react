const { MasterData } = require("../models/MasterData");
const { formatToJSON } = require("../helper/commonMethods");

const getAllMasterData = async (req, res) => {
  try {
    const mastersAll = formatToJSON(await MasterData.findAll());
    return res.status(200).json({
      success: true,
      leads: mastersAll,
      total_counts: mastersAll?.length || 0,
      msg: "master data fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching mastersAll:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMasterDataByName = async (req, res) => {
  try {
    let masterItem = formatToJSON(
      await MasterData.findOne({
        where: { type: req.params?.type },
      })
    );
    return res.status(200).json({
      success: true,
      lead: masterItem.values,
      msg: "data fetched successfully",
    });
  } catch (error) {
    console.log("Error (while fetching users):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to fetch lead",
    });
  }
};

module.exports = {
  getAllMasterData,
  getMasterDataByName,
};
