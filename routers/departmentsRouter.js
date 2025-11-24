const express = require("express");
const router = express.Router();
const departmentsService = require("../services/departmentsService");
const checkUserActions = require("../middlewares/checkUserActions");
const mongoose = require("mongoose");

// Get all departments
router.get("/", checkUserActions, async (req, res) => {
  try {
    const departments = await departmentsService.getAllDepartments();
    res.send(departments);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get all departments with employees
router.get("/with-employees", checkUserActions, async (req, res) => {
  try {
    const result = await departmentsService.getDepartmentsWithEmployees();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get department by ID
router.get("/:id", checkUserActions, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid ID" });
    }

    const department = await departmentsService.getDepartmentById(id);
    if (!department) {
      return res.status(404).send({ message: "Department not found" });
    }
    res.status(200).send(department);
  } catch (err) {
    console.error("Error fetching department by ID:", err);
    res.status(500).send("Failed to fetch department");
  }
});

// Add department
router.post("/", checkUserActions, async (req, res) => {
  try {
    const { name, manager } = req.body;
    const department = await departmentsService.addDepartment({
      name,
      manager,
    });
    res
      .status(201)
      .send({ message: "Department added successfully", department });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update department
router.put("/:id", checkUserActions, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, manager } = req.body;
    const department = await departmentsService.updateDepartment(id, {
      name,
      manager,
    });
    res.send({ message: "Department updated successfully", department });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
