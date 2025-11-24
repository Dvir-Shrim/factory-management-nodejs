const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const usersService = require("../services/usersService");
const checkUserActions = require("../middlewares/checkUserActions");

// Get all users
router.get("/", checkUserActions, async (req, res) => {
  try {
    const users = await usersService.getAllUsers();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get user by ID
router.get("/:id", checkUserActions, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID format");
    }

    const user = await usersService.getUserById(id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send(user);
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).send("Failed to fetch user");
  }
});

module.exports = router;
