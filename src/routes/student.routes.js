import { Router } from "express";
import * as StudentService from "../services/student.service.js";
import { ValidationError } from "../utils/validator.js";

const router = Router();

// GET /students
router.get("/", async (req, res) => {
  try {
    const students = await StudentService.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /students/:id
router.get("/:id", async (req, res) => {
  try {
    const student = await StudentService.getStudentById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /students/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await StudentService.updateStudent(req.params.id, req.body);
    if (!updatedStudent) return res.status(404).json({ error: "Student not found" });
    res.status(200).json(updatedStudent);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.message });
    }

    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /students/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await StudentService.deleteStudent(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Student not found" });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /students
router.post("/", async (req, res) => {
  try {
    const newStudent = await StudentService.createStudent(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.message });
    }

    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
