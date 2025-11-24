const usersRepo = require('../repositories/usersRepo');

const getAllUsers = async () => {
  try {
    return await usersRepo.getAllUsers();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getUserById = async (id) => {
  try {
    return await usersRepo.getUserById(id);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  getAllUsers,
  getUserById
};
