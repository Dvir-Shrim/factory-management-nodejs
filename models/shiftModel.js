const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const shiftSchema = new Schema(
  {
    date: { type: Date, required: true },
    startingHour: { type: Number, required: true },
    endingHour: { type: Number, required: true },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Shift", shiftSchema);
