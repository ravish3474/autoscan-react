const { Brand } = require("../models/Brand");
const { formatToJSON } = require("../helper/commonMethods");

const getAllBrandPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);

    // Calculate the start and end indexes for the requested page
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    let brand = formatToJSON(
      await Brand.findAll({
        where: {
          is_deleted: 0,
        },
        order: [["id", "DESC"]],
      })
    );
    const paginatedBrands = brand.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(brand?.length / pageSize);

    return res.status(200).json({
      success: true,
      brand: paginatedBrands,
      total_counts: brand?.length || 0,
      totalPages: totalPages,
      msg: "Brands fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching Brands:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll({
      where: { is_deleted: 0 },
    });
    return res.status(200).json({
      success: true,
      allBrands: brands,
      total_counts: brands?.length || 0,
      msg: "Brand fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching Brand:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBrandById = async (req, res) => {
  try {
    let brandData = formatToJSON(
      await Brand.findOne({
        where: { id: req.params?.brandId, is_deleted: 0 },
      })
    );
    return res.status(200).json({
      success: true,
      brand: brandData,
      msg: "Brand fetched successfully",
    });
  } catch (error) {
    console.log("Error (while fetching Brand):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to fetch Brand",
    });
  }
};

const fetchBrand = async (req, res) => {
  try {
    let allBrands = await Brand.findAll(
      {
        attributes: ["id", "brand_name", "brand_img"],
      },
      { where: { is_deleted: 0 } }
    );

    return res.status(200).json({
      success: true,
      allBrands,
      msg: "brands fetched successfully",
    });
  } catch (error) {
    console.log("Error (while fetching brands):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to fetch brands",
    });
  }
};
const fetchactiveBrand = async (req, res) => {
  try {
    let allBrands = await Brand.findAll({
      where: {
        status: 1,
      },
    });

    return res.status(200).json({
      success: true,
      allBrands,
      msg: "brands fetched successfully",
    });
  } catch (error) {
    console.log("Error (while fetching brands):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to fetch brands",
    });
  }
};

const createNewBrand = async (req, res) => {
  try {
    let { brand_name, status } = req.body;

    let existingBrand = await Brand.findOne({
      where: { brand_name },
    });

    if (existingBrand) {
      return res.status(400).json({
        success: false,
        msg: "Brand already exists. Unable to create a new brand.",
      });
    }

    let userObj = {};
    userObj["brand_name"] = brand_name;
    userObj["status"] = status;
    if (req.files && req.files?.length > 0) {
      req.files?.forEach((item) => {
        if (item && item !== undefined) {
          // console.log(item);
          if (process.env.MEDIA_LOCATION_S3 === "true") {
            if (item.location) {
              userObj[item.fieldname] = item.key;
            }
          } else {
            if (item.path) {
              userObj[item.fieldname] = item.path;
            }
          }
        } else if (req.body.image === "null") {
          //incase user wants to remove its image
          userObj[item.fieldname] = "";
        }
      });
    }
    let newBrand = await Brand.create({
      ...userObj,
    });

    return res.status(200).json({
      success: true,
      newBrand,
      msg: "Brand created successfully",
    });
  } catch (error) {
    console.log("Error (while creating brand):", error);
    return res.status(500).json({
      success: false,
      msg: "Unable to create brand",
    });
  }
};

const updateBrandById = async (req, res) => {
  try {
    let { id } = req.params;
    let brandObj = {};
    let { brand_name, status } = req.body;

    brandObj["brand_name"] = brand_name;
    brandObj["status"] = status;
    if (req.files && req.files?.length > 0) {
      req.files?.forEach((item) => {
        if (item && item !== undefined) {
          // console.log(item);
          if (process.env.MEDIA_LOCATION_S3 === "true") {
            if (item.location) {
              brandObj[item.fieldname] = item.key;
            }
          } else {
            if (item.path) {
              brandObj[item.fieldname] = item.path;
            }
          }
        } else if (req.body.image === "null") {
          //incase user wants to remove its image
          brandObj[item.fieldname] = "";
        }
      });
    }
    let updatedBrand = await Brand.update(
      {
        ...brandObj,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      success: true,
      msg: "Brand updated successfully",
    });
  } catch (error) {
    console.log("Error (while updating Brand):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to update Brand",
    });
  }
};

const togglestatus = async (req, res) => {
  const id = req.params.id;

  try {
    const brand = await Brand.findByPk(id);

    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }
    if (brand.status == "0") {
      brand.status = "1";
    } else {
      brand.status = "0";
    }

    await brand.save();

    res.json({
      message: "Status toggled successfully",
      updatedStatus: brand.status,
    });
  } catch (error) {
    console.error("Error toggling brand status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBrandById = async (req, res) => {
  try {
    let { id } = req.params;

    let is_deleted = await Brand?.update(
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
      throw new Error("Unable to delete brand. Some error occured!");

    return res.status(200)?.json({
      success: true,
      msg: "brand deleted successfully",
    });
  } catch (err) {
    console.log("Error (while deleting user):::", err);
    return res.status(404)?.json({
      success: false,
      msg: "Unable to delete brand. Some error occured!",
    });
  }
};

module.exports = {
  getAllBrandPagination,
  getAllBrands,
  togglestatus,
  createNewBrand,
  fetchBrand,
  deleteBrandById,
  fetchactiveBrand,
  updateBrandById,
  getBrandById,
};
