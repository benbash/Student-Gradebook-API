import { Router } from "express";
import * as StudentService from "../services/student.service.js";

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

// POST /students
router.post("/", async (req, res) => {
  try {
    const newStudent = await StudentService.createStudent(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    console.error(error); // <--- ADD THIS LINE TEMPORARILY
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
