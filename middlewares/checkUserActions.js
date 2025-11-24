const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const checkUserActions = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).send("Access denied. No token provided.");

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).send("Invalid token format");

    const decoded = jwt.verify(token, JWT_SECRET);

    let user = await User.findOne({ fullName: decoded.name });

    if (!user) {
      user = await User.create({
        fullName: decoded.name,
        numOfActions: 0,
      });
    }

    const currentDate = new Date();
    const lastReset = user.lastReset ? new Date(user.lastReset) : null;
    const isSameDay = lastReset && currentDate.toDateString() === lastReset.toDateString();

    if (!isSameDay) {
      user.numOfActions = 0;
    }

    if (user.numOfActions >= 10) {
      return res.status(403).send("Daily action limit reached. Please try again tomorrow.");
    }

    user.numOfActions += 1;
    await user.save();

    req.user = user;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).send("Invalid or expired token");
  }
};

module.exports = checkUserActions;
