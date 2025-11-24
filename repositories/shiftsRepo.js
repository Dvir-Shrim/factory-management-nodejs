const Shift = require('../models/shiftModel');

const getAllShifts = () => Shift.find().populate('employees');

const getShiftById = (id) => Shift.findById(id);

const addShift = (data) => new Shift(data).save();

const updateShift = (id, data) => Shift.findByIdAndUpdate(id, data, { new: true });

const deleteShift = (id) => Shift.findByIdAndDelete(id);

module.exports = {
    getAllShifts,
    getShiftById,
    addShift,
    updateShift,
    deleteShift
}