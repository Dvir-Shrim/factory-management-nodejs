const shiftsRepo = require('../repositories/shiftsRepo');
const Shift = require('../models/shiftModel');
const Employee = require('../models/employeeModel');

const getAllShifts = async () => {
  try {
    return await shiftsRepo.getAllShifts();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getShiftsWithEmployees = async () => {
  try {
    const shifts = await Shift.find().populate('employees', 'firstName lastName');
    
    const result = shifts.map(shift => ({
      _id: shift._id,
      date: shift.date,
      startingHour: shift.startingHour,
      endingHour: shift.endingHour,
      employees: shift.employees.map(emp =>
        emp.firstName ? `${emp.firstName} ${emp.lastName}` : emp
      )
    }));

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


const getShiftById = async (id) => {
  try {
    return await shiftsRepo.getShiftById(id);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const addShift = async (data) => {
  try {
    return await shiftsRepo.addShift(data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const updateShift = async (id, data) => {
  try {
    return await shiftsRepo.updateShift(id, data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const deleteShift = async (id) => {
  try {
    return await shiftsRepo.deleteShift(id);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  getAllShifts,
  getShiftsWithEmployees,
  getShiftById,
  addShift,
  updateShift,
  deleteShift,
};
