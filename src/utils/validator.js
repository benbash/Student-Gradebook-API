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
  if (typeof name !== "string") {
    throw new ValidationError("Student name must be a string.");
  }

  const trimmedName = name.trim();
  if (trimmedName.length === 0) {
    throw new ValidationError("Student name must not be empty.");
  }

  // Allow letters (including common Unicode letters), spaces, apostrophes and hyphens
  const nameRegex = /^[\p{L}\s'\-]+$/u;
  if (!nameRegex.test(trimmedName)) {
    throw new ValidationError(
      "Student name must contain only letters, spaces, apostrophes or hyphens."
    );
  }

  if (!Array.isArray(grades)) {
    throw new ValidationError("Grades must be provided as an array.");
  }

  if (grades.length === 0) {
    throw new ValidationError("Grades array must not be empty.");
  }

  if (
    grades.some(
      (grade) =>
        typeof grade !== "number" || !Number.isFinite(grade) || grade < 0 || grade > 100
    )
  ) {
    throw new ValidationError(
      "Grades array must contain only finite numbers between 0 and 100."
    );
  }
};