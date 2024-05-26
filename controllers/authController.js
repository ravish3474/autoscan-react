const { Pool } = require("pg");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../models/Users");
const { sequelize } = require("sequelize");
const { capitalize } = require("../helper/commonMethods");
const { resetPassword } = require("../template");
const { sendEmail } = require("../helper/awsMailServices");
// Login route
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const hd = JSON.stringify(req.headers);
  //console.log('hd',hd);
  //console.log('companyID',companyID);

  try {
    // Check if the user exists
    let user;
    user = await Users.findOne({
      where: { username: username },
    });

    if (!user) {
      return res.send({
        status: "fail",
        msg: "Invalid username",
        error: "Invalid username",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.send({
        status: "fail",
        msg: "Invalid password",
        error: "Invalid password",
      });
    }

    let today = new Date();
    today.setHours(today.getHours() + 2);

    let userObj = {
      userId: user?.id,
      userType: "admin",
      expiresIn: today,
      email_id: user?.email,
      user_type: user?.user_type,
    };

    const token = jwt.sign(userObj, process.env.JWT_SECRET_KEY);
    return res.send({
      status: "success",
      user: {
        id: user.id,
        role_id: user.role_id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        user_type: user.user_type,
        profile_pic: user.image,
        tokenDetails: userObj,
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
    let user = await Users.findOne({
      where: {
        // email: sequelize.where(sequelize.fn('LOWER', sequelize.col('email')), 'LIKE', '%' + req.params.email.toLowerCase() + '%')
        email: email,
      },
    });

    if (!user)
      return res
        .status(404)
        .send({ status: "fail", msg: "user not exist in the system!" });

    let resetToken = jwt.sign({ id: email }, process.env.JWT_SECRET_KEY);
    let updatedRequest = await Users.update(
      { resetToken: resetToken },
      { where: { email: email } }
    );
    if (!updatedRequest)
      return res
        .status(403)
        .send({ status: "fail", msg: "password forgot request fails!" });
    const link = `${process.env.BASEURL2}reset-password/?token=${resetToken}&user=${user.id}&resetType=resetPWD`;
    var name = capitalize(user.name);
    let mailTemplate = await resetPassword(name, link);
    await sendEmail(user.email, mailTemplate);
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
    let user = await Users.findOne({ where: { email: check.id } });
    if (!user)
      return res.status(401).send({
        status: "fail",
        msg: "This user is no longer exist in the system!",
      });
    if (!user.resetToken)
      return res.status(401).send({
        status: "fail",
        msg: "forgot password link is expired already!",
      });

    let update = await Users.update(
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
    let userDetails = await Users.findOne({ where: { id: req.params.id } });
    if (_.isEmpty(userDetails))
      return res
        .status(404)
        .send({ status: "fail", message: "User is not exist on the system!" });
    if (!userDetails.resetToken || userDetails.resetToken == null)
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
    let user_id = req.body?.user_id;

    let user;
    user = await Users.findOne({
      where: { id: user_id },
    });

    if (!user) {
      return res.send({
        status: "fail",
        msg: "Invalid user id",
        error: "Invalid user id",
      });
    }

    const passwordMatch = await bcrypt.compare(
      current_pass,
      user.password_hash
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

    let update = await Users.update(
      {
        password_hash: password,
        passwordUpdationDate: new Date(),
      },
      { where: { id: user_id } }
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
