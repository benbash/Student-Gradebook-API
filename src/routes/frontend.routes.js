import { Router } from "express";
import * as StudentService from "../services/student.service.js";
import { ValidationError } from "../utils/validator.js";

const router = Router();

// Helper to parse grades from string
const parseGrades = (grades) => {
  let gradesArray = [];
  if (typeof grades === "string") {
    gradesArray = grades
      .split(",")
      .map((g) => Number(g.trim()))
      .filter((n) => !Number.isNaN(n));
  } else if (Array.isArray(grades)) {
    gradesArray = grades.map((g) => Number(g));
  }
  return gradesArray;
};

// GET / - Render dashboard with all students
router.get("/", async (req, res) => {
  try {
    const students = await StudentService.getAllStudents();
    res.render("index", { students, message: null, error: null });
  } catch (error) {
    console.error("Error rendering home page:", error.message || error);
    res.status(500).send("Internal Server Error");
  }
});

// POST /create - Create a new student
router.post("/create", async (req, res) => {
  try {
    const { name, grades } = req.body;
    console.log("Form submission:", { name, grades });

    const gradesArray = parseGrades(grades);

    if (gradesArray.length === 0) {
      const students = await StudentService.getAllStudents();
      return res.render("index", {
        students,
        error: "Please enter valid grades (comma-separated numbers)",
        message: null,
      });
    }

    await StudentService.createStudent({ name, grades: gradesArray });
    console.log("Student created successfully");
    const students = await StudentService.getAllStudents();
    res.render("index", {
      students,
      message: "Student created successfully!",
      error: null,
    });
  } catch (error) {
    console.error("Error creating student:", error.message || error);
    const students = await StudentService.getAllStudents();
    res.render("index", {
      students,
      error: error.message || "Error creating student",
      message: null,
    });
  }
});

// POST /update/:id - Update a student
router.post("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, grades } = req.body;
    console.log("Update submission:", { id, name, grades });

    const gradesArray = parseGrades(grades);

    if (gradesArray.length === 0) {
      const students = await StudentService.getAllStudents();
      return res.render("index", {
        students,
        error: "Please enter valid grades (comma-separated numbers)",
        message: null,
      });
    }

    await StudentService.updateStudent(id, { name, grades: gradesArray });
    console.log("Student updated successfully");
    const students = await StudentService.getAllStudents();
    res.render("index", {
      students,
      message: "Student updated successfully!",
      error: null,
    });
  } catch (error) {
    console.error("Error updating student:", error.message || error);
    const students = await StudentService.getAllStudents();
    res.render("index", {
      students,
      error: error.message || "Error updating student",
      message: null,
    });
  }
});

// POST /delete/:id - Delete a student
router.post("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Delete submission:", { id });

    const deleted = await StudentService.deleteStudent(id);
    if (!deleted) {
      const students = await StudentService.getAllStudents();
      return res.render("index", {
        students,
        error: "Student not found",
        message: null,
      });
    }

    console.log("Student deleted successfully");
    const students = await StudentService.getAllStudents();
    res.render("index", {
      students,
      message: "Student deleted successfully!",
      error: null,
    });
  } catch (error) {
    console.error("Error deleting student:", error.message || error);
    const students = await StudentService.getAllStudents();
    res.render("index", {
      students,
      error: error.message || "Error deleting student",
      message: null,
    });
  }
});

export default router;
