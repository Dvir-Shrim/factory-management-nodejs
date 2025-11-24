const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const employeesService = require("../services/employeesService");
const checkUserActions = require("../middlewares/checkUserActions");

// Get all employees with their shifts
router.get('/with-shifts', checkUserActions, async (req, res) => {
  try {
    const employees = await employeesService.getEmployeesWithShifts();
    res.send(employees);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get all employees
router.get("/", checkUserActions, async (req, res) => {
  try {
    const employees = await employeesService.getAllEmployees();
    res.send(employees);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get employee by ID
router.get("/:id", checkUserActions, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID format");
    }

    const employee = await employeesService.getEmployeeById(id);

    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    res.status(200).send(employee);
  } catch (err) {
    console.error("Error fetching employee by ID:", err);
    res.status(500).send("Failed to fetch employee");
  }
});


// Add new employee
router.post("/", checkUserActions, async (req, res) => {
  try {
    const { firstName, lastName, startWorkYear, departmentID } = req.body;
    const employee = await employeesService.addEmployee({
      firstName,
      lastName,
      startWorkYear,
      departmentID,
    });
    res.status(201).send({ message: "Employee added successfully", employee });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update employee
router.put("/:id", checkUserActions, async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, startWorkYear, departmentID } = req.body;
    const employee = await employeesService.updateEmployee(id, {
      firstName,
      lastName,
      startWorkYear,
      departmentID,
    });
    res.send({ message: "Employee updated successfully", employee });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete employee
router.delete("/:id", checkUserActions, async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeesService.deleteEmployee(id);
    res.send({ message: "Employee deleted successfully", employee });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
