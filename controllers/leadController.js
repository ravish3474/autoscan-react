const { Leads } = require("../models/Leads");
const { formatToJSON } = require("../helper/commonMethods");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

const getAllLeads = async (req, res) => {
  try {
    const leads = await Leads.findAll();
    return res.status(200).json({
      success: true,
      leads: leads,
      total_counts: leads?.length || 0,
      msg: "lead fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getFilteredData = async (req, res) => {
  try {
    let {
      platform = "",
      from_date = "",
      to_date = "",
      name_lead_id = "",
      status = "",
      u_state = "",
      city = "",
      utm_source = "",
      utm_medium = "",
      utm_campaign = "",
      utm_term = "",
      campaign = "",
      // startDate = "",
      // endDate = "",
    } = req.body;

    let query1 = {};

    if (name_lead_id) {
      query1.lead_unique_id = name_lead_id;
    }
    // if (name_lead_id) {
    //   query1.first_name = name_lead_id;
    // }
    if (platform) {
      query1.platform = platform;
    }
    if (status) {
      query1.lead_type = status;
    }
    if (u_state) {
      query1.state = u_state;
    }
    if (city) {
      query1.city = city;
    }
    if (utm_source) {
      query1.utm_source = utm_source;
    }
    if (utm_medium) {
      query1.utm_medium = utm_medium;
    }
    if (utm_campaign) {
      query1.utm_campaign = utm_campaign;
    }
    if (utm_term) {
      query1.utm_term = utm_term;
    }
    if (campaign) {
      query1.campaign_name = campaign;
    }

    if (from_date && to_date) {
      query1.createdAt = {
        [Op.between]: [
          `${new Date(from_date).toISOString()}`,
          `${new Date(to_date).toISOString()}`,
        ],
      };
    }

    const filterdLeads = await Leads.findAll({
      where: query1,
    });

    return res.status(200).json({
      success: true,
      leads: filterdLeads,
      total_counts: filterdLeads?.length || 0,
      msg: "lead fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllLeadsPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);

    // Calculate the start and end indexes for the requested page
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    // Slice the products array based on the indexes
    const leads = await Leads.findAll({ order: [["updatedAt", "DESC"]] });
    const paginatedLeads = leads.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(leads?.length / pageSize);

    return res.status(200).json({
      success: true,
      leads: paginatedLeads,
      total_counts: leads?.length || 0,
      totalPages: totalPages,
      msg: "lead fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getLeadById = async (req, res) => {
  try {
    let leadData = formatToJSON(
      await Leads.findOne({
        where: { id: req.params?.id },
      })
    );
    return res.status(200).json({
      success: true,
      lead: leadData,
      msg: "lead fetched successfully",
    });
  } catch (error) {
    console.log("Error (while fetching users):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to fetch lead",
    });
  }
};

const createLead = async (req, res) => {
  try {
    let {
      source,
      platform,
      category,
      name,
      pincode,
      gender,
      phone,
      remark,
      email,
      state,
      city,
    } = req.body;
    let newLead = await Leads.create({
      source,
      platform,
      lead_unique_id: 0,
      category,
      first_name: name,
      gender,
      pincode,
      state,
      city,
      phone,
      email,
      comments: remark,
    });
    await Leads.update(
      {
        lead_unique_id: newLead.id,
      },
      {
        where: {
          id: newLead.id,
        },
      }
    );
    return res.status(200).json({
      success: true,
      newLead,
      msg: "Lead created successfully",
    });
  } catch (error) {
    console.log("Error (while creating Lead):", error);
    return res.status(500).json({
      success: false,
      msg: "Unable to create Lead",
    });
  }
};

const updateLead = async (req, res) => {
  try {
    let { id } = req.params;
    let leadObj = {};

    // Updating the required fields for lead;
    let {
      source,
      category,
      platform,
      name,
      pincode,
      gender,
      phone,
      remark,
      email,
      state,
      city,
    } = req.body;

    leadObj["name"] = source;
    leadObj["platform"] = platform;
    leadObj["category"] = category;
    leadObj["first_name"] = name;
    leadObj["pincode"] = pincode;
    leadObj["gender"] = gender;
    leadObj["comments"] = remark;
    leadObj["phone"] = phone;
    leadObj["email"] = email;
    leadObj["state"] = state;
    leadObj["city"] = city;

    let updatedLead = await Leads.update(
      {
        ...leadObj,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      success: true,
      msg: "Lead updated successfully",
    });
  } catch (error) {
    console.log("Error (while updating Lead:::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to update Lead",
    });
  }
};
const deleteLeadById = async (req, res) => {
  try {
    let { id } = req.params;

    let is_deleted = await Leads?.update(
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
      throw new Error("Unable to delete lead. Some error occured!");

    return res.status(200)?.json({
      success: true,
      msg: "lead deleted successfully",
    });
  } catch (err) {
    console.log("Error (while deleting user):::", err);
    return res.status(404)?.json({
      success: false,
      msg: "Unable to delete lead. Some error occured!",
    });
  }
};

module.exports = {
  getAllLeads,
  getFilteredData,
  getAllLeadsPagination,
  getLeadById,
  createLead,
  updateLead,
  deleteLeadById,
};
