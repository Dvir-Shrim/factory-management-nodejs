const User = require("../models/userModel");

const getAllUsers = () => User.find();

const getUserById = (id) => User.findById(id);

module.exports = {
  getAllUsers,
  getUserById
};
