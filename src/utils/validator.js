export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

export const validateStudentData = (studentData) => {
  if (!studentData || typeof studentData !== "object") {
    throw new ValidationError("Student data must be provided as an object.");
  }

  const { name, grades } = studentData;

  if (typeof name !== "string" || name.trim().length === 0) {
    throw new ValidationError("Student name must be a non-empty string.");
  }

  if (!Array.isArray(grades)) {
    throw new ValidationError("Grades must be provided as an array.");
  }

  if (grades.length === 0) {
    throw new ValidationError("Grades array must not be empty.");
  }

  if (grades.some((grade) => typeof grade !== "number" || !Number.isFinite(grade))) {
    throw new ValidationError("Grades array must contain only finite numbers.");
  }
};
