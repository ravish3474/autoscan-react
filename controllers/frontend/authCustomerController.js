const { Pool } = require("pg");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Customer } = require("../../models/frontend/Customer");
const { sequelize } = require("sequelize");
const { capitalize } = require("../../helper/commonMethods");
const { resetPassword } = require("../../template");
const { sendEmail } = require("../../helper/awsMailServices");
// Login route
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const hd = JSON.stringify(req.headers);
  //console.log('hd',hd);
  //console.log('companyID',companyID);

  try {
    // Check if the customer exists
    let customer;
    customer = await Customer.findOne({
      where: { username: username },
    });

    if (!customer) {
      return res.send({
        status: "fail",
        msg: "Invalid username",
        error: "Invalid username",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      customer.password_hash
    );

    if (!passwordMatch) {
      return res.send({
        status: "fail",
        msg: "Invalid password",
        error: "Invalid password",
      });
    }

    let today = new Date();
    today.setHours(today.getHours() + 2);

    let customerObj = {
      customerId: customer?.id,
      customerType: "customer",
      expiresIn: today,
      email_id: customer?.email,
    };

    const token = jwt.sign(customerObj, process.env.JWT_SECRET_KEY);
    return res.send({
      status: "success",
      customer: {
        id: customer.id,
        name: customer.name,
        username: customer.username,
        email: customer.email,
        phone: customer.phone,
        profile_pic: customer.image,
        tokenDetails: customerObj,
      },
      accessToken: token,
    });
    // res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.send({
      status: "fail",
      msg: "Invalid username or password",
      error: "Internal Server Error",
    });
  }
};

//---------- GENERATING TOKEN TO CHANGE FORGETED PASSWORD   ----------/
exports.forgotpass = async (req, res) => {
  try {
    let email = req.body?.email?.toLowerCase() || "";

    if (!email)
      return res
        .status(404)
        .send({ status: "fail", msg: "parameter missing!" });
    let customer = await Customer.findOne({
      where: {
        // email: sequelize.where(sequelize.fn('LOWER', sequelize.col('email')), 'LIKE', '%' + req.params.email.toLowerCase() + '%')
        email: email,
      },
    });

    if (!customer)
      return res
        .status(404)
        .send({ status: "fail", msg: "customer not exist in the system!" });

    let resetToken = jwt.sign({ id: email }, process.env.JWT_SECRET_KEY);
    let updatedRequest = await Customer.update(
      { resetToken: resetToken },
      { where: { email: email } }
    );
    if (!updatedRequest)
      return res
        .status(403)
        .send({ status: "fail", msg: "password forgot request fails!" });
    const link = `${process.env.BASEURL2}reset-password/?token=${resetToken}&customer=${customer.id}&resetType=resetPWD`;
    var name = capitalize(customer.name);
    let mailTemplate = await resetPassword(name, link);
    await sendEmail(customer.email, mailTemplate);
    return res.status(200).send({
      status: "success",
      msg: "change password request successfully accepted please check your registered email address!",
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      msg: `${error.message}`,
    });
  }
};

//---------- UPDATE USER PASSWORD BY EMAIL ID  ----------/
exports.passwordReset = async (req, res) => {
  try {
    if (!req.query)
      return res
        .status(404)
        .send({ status: "fail", msg: "parameter missing!" });
    var check = jwt.verify(req.query.token, process.env.JWT_SECRET_KEY);

    if (!check)
      return res.status(401).send({
        status: "fail",
        msg: "Authentication failed due to incorrect parameters!",
      });

    const salt = await bcrypt.genSalt(10);
    let password = bcrypt.hashSync(req.query.password, salt);
    let customer = await Customer.findOne({ where: { email: check.id } });
    if (!customer)
      return res.status(401).send({
        status: "fail",
        msg: "This customer is no longer exist in the system!",
      });
    if (!customer.resetToken)
      return res.status(401).send({
        status: "fail",
        msg: "forgot password link is expired already!",
      });

    let update = await Customer.update(
      {
        resetToken: null,
        password_hash: password,
        passwordUpdationDate: new Date(),
      },
      { where: { email: check.id } }
    );
    if ((update[0] = 0))
      return res.status(403).send({
        status: "fail",
        msg: "no changes detected yet try after sometime!",
      });
    return res
      .status(200)
      .send({ status: "success", msg: "password updated successfully" });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      msg: `${error.message}`,
    });
  }
};

//---------- CHEKING UPDATE PASSWORD TOKEN IS ACTIVE OR EXPIRED ----------/
exports.verifyToken = async (req, res) => {
  try {
    let customerDetails = await Customer.findOne({
      where: { id: req.params.id },
    });
    if (_.isEmpty(customerDetails))
      return res
        .status(404)
        .send({ status: "fail", message: "User is not exist on the system!" });
    if (!customerDetails.resetToken || customerDetails.resetToken == null)
      return res.status(403).send({
        status: "fail",
        message: "The link is Already used or Expired please try with new one!",
      });
    return res
      .status(200)
      .send({ status: "success", message: "you can reset your password!" });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      msg: `${error.message}`,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    let current_pass = req.body?.current_pass;
    let new_pass = req.body?.new_pass;
    let confirm_pass = req.body?.confirm_pass;
    let email = req.body?.email;
    let customer_id = req.body?.customer_id;

    let customer;
    customer = await Customer.findOne({
      where: { id: customer_id },
    });

    if (!customer) {
      return res.send({
        status: "fail",
        msg: "Invalid customer id",
        error: "Invalid customer id",
      });
    }

    const passwordMatch = await bcrypt.compare(
      current_pass,
      customer.password_hash
    );

    if (!passwordMatch) {
      return res.send({
        status: "fail",
        msg: "Current password not match",
        error: "Invalid password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    let password = bcrypt.hashSync(confirm_pass, salt);

    let update = await Customer.update(
      {
        password_hash: password,
        passwordUpdationDate: new Date(),
      },
      { where: { id: customer_id } }
    );
    if (update[0] == 0)
      return res.status(403).send({
        status: "fail",
        msg: "no changes detected yet try after sometime!",
      });
    return res
      .status(200)
      .send({ status: "success", msg: "password updated successfully" });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      msg: `${error.message}`,
    });
  }
};


function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000);
}
async function sendOtp(mobileNumber, otp) {
  // Implement SMS sending logic using nodemailer or another library
  console.log(`Sending OTP ${otp} to ${mobileNumber}`);
}

exports.register = async (req, res) => {
  const { mobileNumber } = req.body;
  const otp = generateOtp();
  const existingCustomer = await Customer.findOne({ where: { mobileNumber } });
  if (existingCustomer) {
    await existingCustomer.update({ otp, verified: false });
  } else {
    const otpInstance = await Customer.create({ mobileNumber, otp, verified: false });
  }
  // await sendOtp(mobileNumber, otp);
  res.json({ message: 'OTP sent successfully' });
}

exports.verifyotp = async (req, res) => {
  const { mobileNumber, otp } = req.body;
  const otpInstance = await Customer.findOne({ where: { mobileNumber } });
  if (!otpInstance) {
    return res.status(404).json({ message: 'OTP not found' });
  }

  if (otpInstance.otp !== otp) {
    return res.status(401).json({ message: 'Invalid OTP' });
  }

  await otpInstance.update({ verified: true });

  let today = new Date();
  today.setHours(today.getHours() + 2);

  let customerObj = {
    customerId: otpInstance?.id,
    customerType: "customer",
    expiresIn: today,
    email_id: otpInstance?.email,
  };

  const token = jwt.sign(customerObj, process.env.JWT_SECRET_KEY);

  return res.status(200).json({
    status: "success",
    customer: {
      id: otpInstance.id,
      name: otpInstance.name,
      email: otpInstance.email,
      phone: otpInstance.mobileNumber,
      profile_pic: otpInstance.image,
      tokenDetails: customerObj,
    },
    accessToken: token,
  });
}



exports.resendOtp = async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    const otp = generateOtp();
    const existingCustomer = await Customer.findOne({ where: { mobileNumber } });
    if (existingCustomer) {
      await existingCustomer.update({ otp, verified: false });
    } else {
      const otpInstance = await Customer.create({ mobileNumber, otp, verified: false });
    }
    res.status(200).json({ message: 'OTP resent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error resending OTP' });
  }
};

exports.updateCustomer = async (req, res) => {
  const { mobileNumber,email, name } = req.body;
  try {
      const customer = await Customer.findOne({ where: { mobileNumber } });
      if (!customer) {
          return res.status(404).json({ message: 'customer not found' });
      }

      await Customer.update(
          { name,email }, 
          { where: { mobileNumber } } 
      );

      return res.status(200).json({ message: 'customer updated successfully' });
  } catch (error) {
      console.error('Error updating customer:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};