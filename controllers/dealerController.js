const { Dealers } = require('../models/Dealers');
const bcrypt = require('bcrypt');
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { formatToJSON } = require('../helper/commonMethods');

const createNewDealer = async (req, res, next) => {
  try {
    const { name, email, phone, address,username, password } = req.body;
console.log(req.body);
    // Check if email or phone already exists
    const existingUser = await Dealers.findOne({
      where: {
        [Op.or]: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({
          status: false,
          message: 'Email already registered. Please try with another email.',
        });
      } else if (existingUser.phone === phone) {
        return res.status(400).json({
          status: false,
          message: 'Mobile number already registered. Please try with another number.',
        });
      }
    }

    // Create a new dealer
    const dealerData = {
      name,
      email,
      phone,
      address,
      status: 1,
      added_from: 1,
      is_deleted: 0,
    };

    if (password) 
    {
      dealerData.username = username;
      const hashedPassword = await bcrypt.hash(password, 12);
      dealerData.password_hash = hashedPassword;
    }

    const newDealer = await Dealers.create(dealerData);

    return res.status(201).json({
      success: true,
      dealerInfo: newDealer,
      message: 'Dealer created successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Unable to create dealer',
    });
  }
};

const getAllDealers = async (req, res, next) => {
  try {
    let dealerData = JSON.parse(
      JSON.stringify(
        await Dealers.findAll({
          where: {
            is_deleted: 0,
          },
          order: [["id", "DESC"]],
        })
      )
    );
  
    dealerData = dealerData.map(item => ({
      id: item.id,
      name: item.name,
      username: item.username,
      email: item.email,
      phone: item.phone,
      address: item.address,
    }));

    return res.status(200).json({
      success: true,
      dealerList: dealerData,
      message: 'dealers fetched successfully',
    });
  } catch (error) {
    console.log('Error (while fetching dealers):::', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch dealers',
    });
  }
};



const getAlDealerPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);

    // Calculate the start and end indexes for the requested page
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    let dealer = await Dealers.findAll({
          attributes: [
            'id',
            'username',
            'name',
            'email',
            'phone',
            'address',
          ],
          where: {
            is_deleted: 0,
          },
          order: [["id", "DESC"]],
        });

    const paginatedDealers = dealer.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(dealer?.length / pageSize);

    return res.status(200).json({
      success: true,
      dealer: paginatedDealers,
      total_counts: dealer?.length || 0,
      totalPages: totalPages,
      msg: "Dealers fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching Dealers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateDealerById = async (req, res, next) => {
  try {
    let { dealerId } = req.params;
    let existingDealer;

    try {
      existingDealer = await Dealers.findOne({
        where: {
          [Op.and]: [
            {
              email: req.body?.email,
            },
            {
              [Op.not]: { id: parseInt(dealerId) },
            },
          ],
        },
      });
    } catch (err) {
      console.log('Errr:::', err);
      return res.status(500).json({
        status: false,
        message: 'Dealer updating failed, please try again later.',
      });
    }

    // Only runs if the user with the given email already exists;
    if (existingDealer) {
      // Check if multiple mobile no. already exists
      let old_number =existingDealer.phone;
      let new_number = req.body?.phone;
      if (!isEmpty(req.body.phone) && old_number !== new_number) {
        let existingDealerCount = await Dealers.findOne({
          where: {
            $and: [
              { phone: req.body.phone }
            ],
          },
        });
        if (!isEmpty(existingDealerCount)) {
          return res.status(401).json({
            status: false,
            message:'Sorry this mobile number already registered with us. Please try with another number.'
          });
        }
      }

      // check if email is already exist
      let old_email = existingDealer.email;
      let new_email = req.body.email;
      if (!isEmpty(req.body.email) && old_email !== new_email) {
        let existingEmailCount = await Dealers.findOne({
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

    let dealerObj = {};

    // Updating the required fields for user profile;
    let {
      name,
      email,
      phone,
      username,
      password,
      change_password,
      address,
    } = req.body;
    dealerObj['name'] = name;
    dealerObj['email'] = email;
    dealerObj['phone'] = phone;
    dealerObj['username'] = username;
    dealerObj['address'] = address;
    dealerObj['added_from'] = 1;

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
        dealerObj['password_hash'] = hashedPassword;
      }
    }
    let updatedDealer = await Dealers.update(
      {
        ...dealerObj,
      },
      {
        where: {
          id: dealerId,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: 'dealers updated successfully',
    });
  } catch (error) {
    console.log('Error (while updating dealers):::', error);
    return res.status(404).json({
      success: false,
      message: 'Unable to update user',
    });
  }
};

const getDealerById = async (req, res, next) => {
  try {
    let dealerData = formatToJSON(
      await Dealers.findOne({
        where: { id: req.params?.dealerId, is_deleted: 0 },
        attributes: [
          'name',
          'email',
          'phone',
          'username',
          'address',
          'password_hash',
        ],
      })
    );
    dealerData = {
      ...dealerData,
      change_password: false,
    };
    delete dealerData['role_id'];

    return res.status(200).json({
      success: true,
      dealer: dealerData,
      message: 'dealers fetched successfully',
    });
  } catch (error) {
    console.log('Error (while fetching dealers):::', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch dealer',
    });
  }
};

const deleteDealerById = async (req, res, next) => {
  try {
    let { dealerId } = req.params;

    let is_deleted = await Dealers?.update(
      {
        is_deleted: 1,
      },
      {
        where: {
          id: dealerId,
        },
      }
    );

    if (!is_deleted)
      throw new Error('Unable to delete dealer. Some error occured!');

    return res.status(200)?.json({
      success: true,
      message: 'dealer deleted successfully',
    });
  } catch (err) {
    console.log('Error (while deleting dealer):::', err);
    return res.status(500)?.json({
      success: false,
      message: 'Unable to delete dealer. Some error occured!',
    });
  }
};

module.exports = {
  getAllDealers,
  getAlDealerPagination,
  createNewDealer,
  getDealerById,
  updateDealerById,
  deleteDealerById,
};

