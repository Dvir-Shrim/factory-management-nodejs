const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const employeeSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    startWorkYear: { type: Number, required: true },
    departmentID: { type: Schema.Types.ObjectId, ref: "Department", required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Employee", employeeSchema);
