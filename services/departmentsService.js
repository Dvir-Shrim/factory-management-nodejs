const departmentsRepo = require('../repositories/departmentsRepo');
const Employee = require('../models/employeeModel');

// Get all departments
const getAllDepartments = async () => {
  try {
    return await departmentsRepo.getAllDepartments();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Get department by ID
const getDepartmentById = async (id) => {
  try {
    return await departmentsRepo.getDepartmentByID(id);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Add department
const addDepartment = async (data) => {
  try {
    return await departmentsRepo.addDepartment(data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Update department
const updateDepartment = async (id, data) => {
  try {
    return await departmentsRepo.updateDepartment(id, data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Complex query: departments with employees
const getDepartmentsWithEmployees = async () => {
  try {
    const departments = await departmentsRepo.getAllDepartments();
    const allEmployees = await Employee.find();

    const result = departments.map((dep) => {
      const depEmployees = allEmployees.filter(
        (emp) => emp.departmentID?.toString() === dep._id.toString()
      );

      return {
        _id: dep._id,
        name: dep.name,
        manager: dep.manager,
        employees: depEmployees.map((e) => `${e.firstName} ${e.lastName}`),
      };
    });

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartment,
  getDepartmentsWithEmployees,
};
