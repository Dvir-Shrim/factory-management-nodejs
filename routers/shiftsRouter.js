const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const shiftsService = require("../services/shiftsService");
const checkUserActions = require("../middlewares/checkUserActions");

// Get all shifts
router.get("/", checkUserActions, async (req, res) => {
  try {
    const shifts = await shiftsService.getAllShifts();
    res.send(shifts);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get all shifts with their employees
router.get("/with-employees", checkUserActions, async (req, res) => {
  try {
    const shifts = await shiftsService.getShiftsWithEmployees();
    res.send(shifts);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get shift by ID
router.get("/:id", checkUserActions, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID format");
    }

    const shift = await shiftsService.getShift(id);

    if (!shift) {
      return res.status(404).send("Shift not found");
    }

    res.status(200).send(shift);
  } catch (err) {
    console.error("Error fetching shift by ID:", err);
    res.status(500).send("Failed to fetch shift");
  }
});

// Add new shift
router.post("/", checkUserActions, async (req, res) => {
  try {
    const { date, startingHour, endingHour, employees } = req.body;
    const shift = await shiftsService.addShift({
      date,
      startingHour,
      endingHour,
      employees,
    });
    res.status(201).send({ message: "Shift added successfully", shift });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update shift
router.put("/:id", checkUserActions, async (req, res) => {
  try {
    const { id } = req.params;
    const { date, startingHour, endingHour, employees } = req.body;
    const shift = await shiftsService.updateShift(id, {
      date,
      startingHour,
      endingHour,
      employees,
    });
    res.send({message: "Shift updated successfully", shift});
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete shift
router.delete("/:id", checkUserActions, async (req, res) => {
  try {
    const { id } = req.params;
    const shift = await shiftsService.deleteShift(id);
    res.send({message: "Shift deleted successfully", shift});
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
