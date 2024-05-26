const { Users } = require('../models/Users');
const { Role } = require('../models/Role');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const { UserRoleAssociation } = require('../associations/index');
const { formatToJSON } = require('../helper/commonMethods');
UserRoleAssociation();
function isEmpty(obj) {
  return !Object.keys(obj).length > 0;
}
const getAllUsers = async (req, res, next) => {
  try {
    let userData = JSON.parse(
      JSON.stringify(
        await Users.findAll({
          include: [
            {
              model: Role,
              key: 'id',
              attributes: ['name'],
            },
          ],
          attributes: [
            'id',
            'username',
            'name',
            'email',
            'phone',
          ],
          where: {
            is_deleted: 0,
          },
        })
      )
    );
  
    userData = userData.map(item => ({
      id: item.id,
      role: item.role?.name,
      name: item.name,
      email: item.email,
      phone: item.phone,
      username: item.username,
    }));

    return res.status(200).json({
      success: true,
      userList: userData,
      message: 'users fetched successfully',
    });
  } catch (error) {
    console.log('Error (while fetching users):::', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch users',
    });
  }
};



const getAlUserPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);

    // Calculate the start and end indexes for the requested page
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    let user = await Users.findAll({
          include: [
            {
              model: Role,
              key: 'id',
              attributes: ['name'],
            },
          ],
          attributes: [
            'id',
            'username',
            'name',
            'email',
            'phone',
          ],
          where: {
            is_deleted: 0,
          },
        });

    const paginatedUsers = user.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(user?.length / pageSize);

    return res.status(200).json({
      success: true,
      user: paginatedUsers,
      total_counts: user?.length || 0,
      totalPages: totalPages,
      msg: "Users fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching Users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const createNewUser = async (req, res, next) => {
  try {
    let existingUser;
    try {
      existingUser = await Users.findOne({
        where: {
          email: req.body?.email,
        },
      });
      
    } 
    catch (err) {
      return res.status(500).json({
        status: false,
        message: 'User creation failed, please try again later.',
      });
    }
    if (existingUser) {
      let old_number =
        existingUser.phone;
      let new_number = req.body?.phone;
      if (!isEmpty(req.body.phone) && old_number !== new_number) {
        let existingUserCount = await Users.findOne({
          where: {
            $and: [
              { phone: req.body.phone },
            ],
          },
        });
        if (!isEmpty(existingUserCount)) {
          return res.status(500).json({
            status: false,
            message:'Sorry this mobile number already registered with us. Please try with another number.'
          });
        }
      }

      // check if email is already exist
      let old_email = existingUser.email;
      let new_email = req.body.email;
      if (!isEmpty(req.body.email) && old_email !== new_email) {
        let existingEmailCount = await Users.findOne({
          where: {
            email: req.body?.email,
          },
        });
        if (!isEmpty(existingEmailCount)) {
          return res.status(500).json({
            status: false,
            message:'Sorry this email is already registered with us. Please try with another email.'
          });
        }
      }
    }

    let newUserObj = {};
    let {
      firstname,
      lastname='',
      email,
      phone,
      role_id,
      username,
      password,
    } = req.body;
    newUserObj['firstname'] = firstname;
    newUserObj['lastname'] = lastname;
    newUserObj['name'] = `${firstname} ${lastname}`;
    newUserObj['email'] = email;
    newUserObj['phone'] = phone;
    newUserObj['role_id'] = parseInt(role_id);
    newUserObj['username'] = username;
    newUserObj['is_deleted'] = 0;
    newUserObj['added_from'] = 1;

    if (password && password !== '******') {
      let hashedPassword;
      try {
        hashedPassword = await bcrypt.hash(password, 12);
      } catch (err) {
        return res.status(500).json({
          status: false,
          message: "Couldn't update user info, please try again.",
        });
      }
      newUserObj['password_hash'] = hashedPassword;
    }
    let newUser = await Users.create({
      ...newUserObj,
    });
    return res.status(200).json({
      success: true,
      userInfo: newUser,
      message: 'users created successfully',
    });
  }
   catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to create user',
    });
  }
};

const updateUserById = async (req, res, next) => {
  try {
    let { userId } = req.params;
    let existingUser;

    try {
      existingUser = await Users.findOne({
        where: {
          [Op.and]: [
            {
              email: req.body?.email,
            },
            {
              [Op.not]: { id: parseInt(userId) },
            },
          ],
        },
      });
    } catch (err) {
      console.log('Errr:::', err);
      return res.status(500).json({
        status: false,
        message: 'User updating failed, please try again later.',
      });
    }

    // Only runs if the user with the given email already exists;
    if (existingUser) {
      // Check if multiple mobile no. already exists
      let old_number =existingUser.phone;
      let new_number = req.body?.phone;
      if (!isEmpty(req.body.phone) && old_number !== new_number) {
        let existingUserCount = await Users.findOne({
          where: {
            $and: [
              { phone: req.body.phone }
            ],
          },
        });
        if (!isEmpty(existingUserCount)) {
          return res.status(401).json({
            status: false,
            message:'Sorry this mobile number already registered with us. Please try with another number.'
          });
        }
      }

      // check if email is already exist
      let old_email = existingUser.email;
      let new_email = req.body.email;
      if (!isEmpty(req.body.email) && old_email !== new_email) {
        let existingEmailCount = await Users.findOne({
          where: {
            email: req.body?.email,
          },
        });
        if (!isEmpty(existingEmailCount)) {
          return res.status(401).json({
            status: false,
            message:'Sorry this email is already registered with us. Please try with another email.'
          });
        }
      }
    }

    let userObj = {};

    // Updating the required fields for user profile;
    let {
      firstname,
      lastname='',
      email,
      phone,
      role_id,
      username,
      password,
      change_password,
    } = req.body;
    userObj['firstname'] = firstname;
    userObj['lastname'] = lastname;
    userObj['fullname'] = `${firstname} ${lastname}`;
    userObj['email'] = email;
    userObj['phone'] = phone;
    userObj['role_id'] = parseInt(role_id);
    userObj['username'] = username;
    userObj['added_from'] = 1;

    // password
    if (change_password === 'true' || change_password === true) {
      if (password && password !== '******') {
        let hashedPassword;
        try {
          hashedPassword = await bcrypt.hash(password, 12);
        } catch (err) {
          return res.status(500).json({
            status: false,
            message: "Couldn't update user info, please try again.",
          });
        }
        userObj['password_hash'] = hashedPassword;
      }
    }
    let updatedUser = await Users.update(
      {
        ...userObj,
      },
      {
        where: {
          id: userId,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: 'users updated successfully',
    });
  } catch (error) {
    console.log('Error (while updating users):::', error);
    return res.status(404).json({
      success: false,
      message: 'Unable to update user',
    });
  }
};

const getUserById = async (req, res, next) => {
  try {
    let userData = formatToJSON(
      await Users.findOne({
        where: { id: req.params?.userId, is_deleted: 0 },
        include: [
          {
            model: Role,
            key: 'id',
            attributes: ['id', 'name'],
          },
        ],
        attributes: [
          'name',
          'email',
          'phone',
          'role_id',
          'username',
          'password_hash',
          'image',
        ],
      })
    );
    userData = {
      ...userData,
      change_password: false,
      role: userData?.role?.name,
    };
    delete userData['role_id'];

    return res.status(200).json({
      success: true,
      user: userData,
      message: 'users fetched successfully',
    });
  } catch (error) {
    console.log('Error (while fetching users):::', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch user',
    });
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    let { userId } = req.params;

    let is_deleted = await Users?.update(
      {
        is_deleted: 1,
      },
      {
        where: {
          id: userId,
        },
      }
    );

    if (!is_deleted)
      throw new Error('Unable to delete user. Some error occured!');

    return res.status(200)?.json({
      success: true,
      message: 'user deleted successfully',
    });
  } catch (err) {
    console.log('Error (while deleting user):::', err);
    return res.status(500)?.json({
      success: false,
      message: 'Unable to delete user. Some error occured!',
    });
  }
};

module.exports = {
  getAllUsers,
  getAlUserPagination,
  createNewUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
