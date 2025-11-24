const Department = require('../models/departmentModel');

const getAllDepartments = () => Department.find().populate('manager', 'firstName lastName');

const getDepartmentByID = (id) => Department.findById(id).populate('manager');

const addDepartment = (data) => new Department(data).save();

const updateDepartment = (id, data) => Department.findByIdAndUpdate(id, data, { new: true});

module.exports = {
    getAllDepartments,
    getDepartmentByID,
    addDepartment,
    updateDepartment,
};