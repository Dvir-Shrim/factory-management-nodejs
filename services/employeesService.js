const employeesRepo = require("../repositories/employeesRepo");
const Shift = require("../models/shiftModel");

const getAllEmployees = async () => {
  try {
    return await employeesRepo.getAllEmployees();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getEmployeeById = async (id) => {
  try {
    return await employeesRepo.getEmployeeById(id);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getEmployeesWithShifts = async () => {
  try {
    const employees = await employeesRepo.getAllEmployees();
    const shifts = await Shift.find();

    const result = employees.map(emp => {
      const empShifts = shifts.filter(shift =>
        shift.employees.some(eId => eId.toString() === emp._id.toString())
      );

      return {
        _id: emp._id,
        fullName: `${emp.firstName} ${emp.lastName}`,
        department: emp.departmentID?.name || 'Unassigned',
        shifts: empShifts.map(s => ({
          date: s.date,
          startingHour: s.startingHour,
          endingHour: s.endingHour
        }))
      };
    });

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const addEmployee = async (data) => {
  try {
    return await employeesRepo.addEmployee(data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const updateEmployee = async (id, data) => {
  try {
    return await employeesRepo.updateEmployee(id, data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const deleteEmployee = async (id) => {
  try {
    return await employeesRepo.deleteEmployee(id);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  getAllEmployees,
  getEmployeesWithShifts,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
