const { Leads } = require("../models/Leads");
const { Users } = require("../models/Users");
const { LeadStatusLogs } = require("../models/LeadStatusLogs");
const { formatToJSON } = require("../helper/commonMethods");

const createLeadStatusLog = async (req, res) => {
  try {
    const lead_id = req.body?.id;
    const user_id = req.body?.user_id;
    const lead_status = req.body?.change_status;
    const comment = req.body?.comment;

    try {
      const lead = await Leads.findByPk(lead_id);

      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }

      lead.lead_type = lead_status;

      await lead.save();

      let newLead = await LeadStatusLogs.create({
        lead_id,
        user_id,
        lead_status,
        comment,
      });

      return res.status(200).json({
        success: true,
        updatedStatus: lead.lead_type,
        msg: "Lead logs created successfully",
      });
    } catch (error) {
      console.error("Error toggling lead status:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {}
};
const getLeadStatusLogByLeadId = async (req, res) => {
  try {
    let leadData = formatToJSON(
      await LeadStatusLogs.findAll({
        where: { lead_id: req.params?.id },
        order: [["id", "DESC"]],
      })
    );

    if (leadData?.length > 0) {
      for (let index = 0; index < leadData?.length; index++) {
        let adminData = await Users.findOne({
          where: [{ id: leadData[index]?.user_id }],
        });
        leadData[index]["admin_name"] = adminData?.username;
      }
    }
    return res.status(200).json({
      success: true,
      lead: leadData,
      msg: "lead status log fetched successfully",
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
  createLeadStatusLog,
  getLeadStatusLogByLeadId,
};
