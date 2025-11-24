const mongoose = require("mongoose");
const { Schema } = require('mongoose');


const departmentSchema = new Schema(
  {
    name: { type: String, required: true },
    manager: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Department", departmentSchema);
