const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).send("Username and email are required");
    }

    const response = await axios.get("https://jsonplaceholder.typicode.com/users");

    const matchedUser = response.data.find(
      (u) => u.username === username && u.email === email
    );

    if (!matchedUser) {
      return res.status(401).send("Invalid username or email");
    }

    const token = jwt.sign(
      {
        id: matchedUser.id,
        name: matchedUser.name,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).send({
      message: "Login successfully",
      token,
      user: {
        fullName: matchedUser.name,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Unable to complete login process");
  }
});

module.exports = router;
