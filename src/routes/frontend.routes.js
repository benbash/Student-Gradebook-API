import { Router } from "express";
import * as StudentService from "../services/student.service.js";
import { ValidationError } from "../utils/validator.js";

const router = Router();

// Helper function to show the dashboard again
const renderDashboard = async (res, message = null, error = null) => {
  const students = await StudentService.getAllStudents();

  return res.render("index", {
    students,
    message,
    error,
  });
};

// Helper function to convert grades from form text into numbers
const parseGrades = (grades) => {
  if (typeof grades !== "string") {
    throw new ValidationError("Grades must be entered as comma-separated numbers.");
  }

  const gradeValues = grades.split(",").map((grade) => grade.trim());

  if (gradeValues.length === 0 || gradeValues.some((grade) => grade === "")) {
    throw new ValidationError("Grades cannot be empty.");
  }

  const gradesArray = gradeValues.map((grade) => Number(grade));

  if (gradesArray.some((grade) => Number.isNaN(grade))) {
    throw new ValidationError("Grades must contain only numbers.");
  }

  return gradesArray;
};

// GET /
// Show dashboard with all students
router.get("/", async (req, res) => {
  try {
    await renderDashboard(res);
  } catch (error) {
    console.error("Error rendering dashboard:", error.message || error);
    res.status(500).send("Internal Server Error");
  }
});

// POST /create
// Create a new student from the form
router.post("/create", async (req, res) => {
  try {
    const { name, grades } = req.body;

    const gradesArray = parseGrades(grades);

    await StudentService.createStudent({
      name,
      grades: gradesArray,
    });

    await renderDashboard(res, "Student created successfully!", null);
  } catch (error) {
    console.error("Error creating student:", error.message || error);
    await renderDashboard(res, null, error.message || "Error creating student.");
  }
});

// POST /update/:id
// Update a student from the form
router.post("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, grades } = req.body;

    const gradesArray = parseGrades(grades);

    const updatedStudent = await StudentService.updateStudent(id, {
      name,
      grades: gradesArray,
    });

    if (!updatedStudent) {
      return await renderDashboard(res, null, "Student not found.");
    }

    await renderDashboard(res, "Student updated successfully!", null);
  } catch (error) {
    console.error("Error updating student:", error.message || error);
    await renderDashboard(res, null, error.message || "Error updating student.");
  }
});

// POST /delete/:id
// Delete a student from the form
router.post("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await StudentService.deleteStudent(id);

    if (!deleted) {
      return await renderDashboard(res, null, "Student not found.");
    }

    await renderDashboard(res, "Student deleted successfully!", null);
  } catch (error) {
    console.error("Error deleting student:", error.message || error);
    await renderDashboard(res, null, error.message || "Error deleting student.");
  }
});

export default router;
