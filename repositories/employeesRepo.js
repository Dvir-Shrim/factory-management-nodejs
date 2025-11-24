const Employee = require("../models/employeeModel");
const Shift = require("../models/shiftModel");

const getAllEmployees = () => Employee.find().populate("departmentID", "name");

const getShiftsForEmployee = async (employeeId) => {
  return await Shift.find({ employess: employeeId });
};

const getEmployeeById = (id) => Employee.findById(id);

const addEmployee = (data) => new Employee(data).save();

const updateEmployee = (id, data) => Employee.findByIdAndUpdate(id, data, { new: true });

const deleteEmployee = (id) => Employee.findByIdAndDelete(id);

module.exports = {
  getAllEmployees,
  getShiftsForEmployee,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
