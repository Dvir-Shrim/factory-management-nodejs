const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    numOfActions: { type: Number, default: 10 },
    lastReset: { type: Date, default: new Date() },
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
