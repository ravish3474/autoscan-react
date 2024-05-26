const { Permissions } = require("../models/Permissions");



const fetchpermissions = async (req, res) => {
    try {
      let allPermissions = await Permissions.findAll();
  
      return res.status(200).json({
        success: true,
        allPermissions,
        msg: "permission fetched successfully",
      });
    } 
    catch (error) 
    {
      return res.status(404).json({
        success: false,
        msg: "Unable to fetch permission",
      });
    }
  };

module.exports = {

  fetchpermissions,
};
