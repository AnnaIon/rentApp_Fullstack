const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const util = require("util");
const sendEmail = require("../Email");
const { request } = require("http");

exports.signup = async (req, res) => {
  try {
    let newUser = await User.create(req.body);
    res.status(201).json({ status: "success", data: newUser });
  } catch (err) {
    res.status(400).json({ status: "failed", message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide an email and password.",
    });
  }

  const userDB = await User.findOne({ email });

  if (!userDB || !(await userDB.comparePassword(password, userDB.password))) {
    return res
      .status(400)
      .json({ status: "failed", message: "Incorrect email or password!" });
  }

  const token = jwt.sign({ id: userDB._id }, process.env.SECRET_STR, {
    expiresIn: "7d",
  });

  return res
    .status(200)
    .json({ status: "success", message: "Login", token, data: userDB });
};

exports.getCurrentUser = async (req, res) => {
  try {
    let user = req.currentUser;
    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
    }
    return res.status(200).json({ status: "success", data: user });
  } catch (err) {
    return res
      .status(400)
      .json({ status: "failed", message: " Error fetching the user" });
  }
};

exports.protectSystem = async (req, res, next) => {
  try {
    const valueToken = req.headers.authorization;
    let token;

    if (valueToken && valueToken.startsWith("Bearer")) {
      token = valueToken.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ status: "failed", message: "You are not logged in." });
    }

    const decodedToken = await util.promisify(jwt.verify)(
      token,
      process.env.SECRET_STR
    );
    const currentUser = await User.findById(decodedToken.id);

    if (!currentUser) {
      return res
        .status(401)
        .json({ status: "failed", message: "The user doesn't exist!" });
    }

    if (await currentUser.isPasswordChanged(decodedToken.iat)) {
      return res.status(401).json({
        status: "failed",
        message: "The password was changed! Please login again!",
      });
    }

    req.currentUser = currentUser;
    next();
  } catch (err) {
    return res.status(400).json({ status: "failed", message: err.message });
  }
};

exports.permission = async (req, res, next) => {
  if (req.currentUser && req.currentUser.role === "admin") {
    return next();
  } else {
    return res.status(403).json({ message: "You don't have permission!" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, birthDate } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.currentUser._id,
      { firstName, lastName, birthDate },
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    ).select("-password -__v -passwordResetToken -passwordResetTokenExpires");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ status: "failed", message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -__v -activeToken");
    res.status(200).json({ status: "success", users });
  } catch (err) {
    res
      .status(500)
      .json({ status: "failed", message: "Unable to fetch users" });
  }
};

exports.forgotPassword = async (request, response) => {
  //PART 1
  const user = await User.findOne({ email: request.body.email });
  if (!user) {
    return response
      .status(404)
      .json({ status: "failed", message: "User not found!" });
  }

  //PART 2
  const resetToken = await user.createNewPasswordToken();
  await user.save();

  // const resetUrl = `${request.protocol}://${request.get('host')}/resetPassword/${resetToken}`;

  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
  const message = `Follow this link to reset your password\n${resetUrl}.This link will expire in 10 minutes.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Reset your password",
      message: message,
    });

    return response
      .status(200)
      .json({ status: "success", message: "Token sent to your email." });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save();
    return response
      .status(500)
      .json({ status: "failed", message: "error sending email" });
  }
};

exports.resetPassword = async (request, response) => {
  const userData = await User.findOne({
    passwordResetToken: request.params.token,
    passwordResetTokenExpires: { $gt: Date.now() },
  });
  if (!userData) {
    return response
      .status(400)
      .json({ status: "failed", message: "token is invalid or has expired" });
  }

  userData.password = request.body.password;
  userData.passwordResetToken = undefined;
  userData.passwordResetTokenExpires = undefined;
  userData.passwordChangeAt = Date.now();
  await userData.save();

  const JWT = jwt.sign({ id: userData._id }, process.env.SECRET_STR, {
    expiresIn: process.env.EXPIRATION_TIME || "7d",
  });
  
  return response.status(200).json({ status: "succes", JWT, data: userData });
};

exports.updatePassword = async (request, response) => {
  const user = await User.findById(request.currentUser.id);

  if (!(await user.comparePassword(request.body.password, user.password))) {
    return response
      .status(400)
      .json({ status: "failed", message: "current password is inccorect" });
  }

  user.password = request.body.newPassword;
  user.passwordChangeAt = Date.now();
  await user.save();
  const JWT = jwt.sign({ id: user._id }, process.env.SECRET_STR, {
    expiresIn: process.env.EXPIRATION_TIME,
  });
  return response.status(200).json({ status: "success", JWT, data: user });
};
exports.updateProfile = async (request, response) => {
  const updatedUser = await User.findByIdAndUpdate(
    request.currentUser.id,
    request.body,
    { new: true, runValidators: true }
  );
  return response.status(200).json({ status: "succes", data: updatedUser });
};

