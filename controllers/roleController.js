const { Role } = require("../models/Role");
const { Users } = require("../models/Users");
const { formatToJSON } = require("../helper/commonMethods");

const getAllRoles = async (req, res) => {
  try {
    let roles = formatToJSON(
      await Role.findAll({
        where: { is_deleted: 0 },
      })
    );

    if (roles?.length > 0) {
      for (let index = 0; index < roles?.length; index++) {
        let no_of_users = await Users.count({
          where: [{ role_id: roles[index]?.id }, { is_deleted: 0 }],
        });
        roles[index]["no_of_users"] = no_of_users;
      }
    }
    res.status(200).json(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRoleById = async (req, res) => {
  try {
    let roleData = formatToJSON(
      await Role.findOne({
        where: { id: req.params?.id, is_deleted: 0 },
      })
    );
    return res.status(200).json({
      success: true,
      role: roleData,
      msg: "role fetched successfully",
    });
  } catch (error) {
    console.log("Error (while fetching users):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to fetch role",
    });
  }
};

const fetchroles = async (req, res) => {
  try {
    let allRoles = await Role.findAll(
      {
        attributes: ["id", "name", "alias"],
      },
      { where: { is_deleted: 0 } }
    );

    return res.status(200).json({
      success: true,
      allRoles,
      msg: "roles fetched successfully",
    });
  } catch (error) {
    console.log("Error (while fetching roles):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to fetch roles",
    });
  }
};
const fetchactiveroles = async (req, res) => {
  try {
    let allRoles = await Role.findAll({
      where: {
        status: 1,
      },
    }
    );

    return res.status(200).json({
      success: true,
      allRoles,
      msg: "roles fetched successfully",
    });
  } catch (error) {
    console.log("Error (while fetching roles):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to fetch roles",
    });
  }
};

const createRole = async (req, res) => {
  try {
    let {
      name
    } = req.body;

    let alias = name.toLowerCase();

    let existingRole = await Role.findOne({
      where: { name },
    });

    if (existingRole) {
      return res.status(400).json({
        success: false,
        msg: "Role already exists. Unable to create a new role.",
      });
    }

    let newRole = await Role.create({
      name,
    });

    return res.status(200).json({
      success: true,
      newRole,
      msg: "Role created successfully",
    });
  } catch (error) {
    console.log("Error (while creating role):", error);
    return res.status(500).json({
      success: false,
      msg: "Unable to create role",
    });
  }
};

const updateRole = async (req, res) => {
  try {
    let { id } = req.params;
    let roleObj = {};

    // Updating the required fields for user profile;
    let { name } =
      req.body;

    roleObj["name"] = name;

    let updatedUser = await Role.update(
      {
        ...roleObj,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      success: true,
      msg: "role updated successfully",
    });
  } catch (error) {
    console.log("Error (while updating role):::", error);
    return res.status(404).json({
      success: false,
      msg: "Unable to update user",
    });
  }
};

const togglestatus = async (req, res) => {
  const id = req.params.id;

  try {
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }
    if (role.status == "0") {
      role.status = "1";
    } else {
      role.status = "0";
    }

    await role.save();

    res.json({
      message: "Status toggled successfully",
      updatedStatus: role.status,
    });
  } catch (error) {
    console.error("Error toggling role status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteRoleById = async (req, res) => {
  try {
    let { id } = req.params;

    let is_deleted = await Role?.update(
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
      throw new Error("Unable to delete role. Some error occured!");

    return res.status(200)?.json({
      success: true,
      msg: "role deleted successfully",
    });
  } catch (err) {
    console.log("Error (while deleting user):::", err);
    return res.status(404)?.json({
      success: false,
      msg: "Unable to delete role. Some error occured!",
    });
  }
};

module.exports = {
  getAllRoles,
  togglestatus,
  createRole,
  fetchroles,
  deleteRoleById,
  fetchactiveroles,
  updateRole,
  getRoleById,
};
