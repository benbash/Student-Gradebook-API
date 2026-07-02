import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE_PATH = path.join(__dirname, "../../data/students.json");

// Helper to read file
const readData = async () => {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    if (error.code === "ENOENT") return [];
    throw error;
  }
};

// Helper to write file
const writeData = async (data) => {
  await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
};

// Helper to compute analytics (Bonus Challenge)
const calculateAnalytics = (grades) => {
  if (!grades || grades.length === 0) {
    return { average: 0, highest: 0, lowest: 0, status: "No grades" };
  }
  const sum = grades.reduce((acc, curr) => acc + curr, 0);
  const average = Math.round((sum / grades.length) * 100) / 100;
  const highest = Math.max(...grades);
  const lowest = Math.min(...grades);
  const status = average >= 50 ? "Pass" : "Fail"; // Pass threshold set at 50

  return { average, highest, lowest, status };
};

export const getAllStudents = async () => {
  return await readData();
};

export const getStudentById = async (id) => {
  const students = await readData();
  return students.find((s) => s.id === id);
};

export const createStudent = async (studentData) => {
  const students = await readData();

  // Unique Crypto ID generation
  const newStudent = {
    id: crypto.randomUUID(),
    name: studentData.name,
    grades: studentData.grades,
    ...calculateAnalytics(studentData.grades),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  students.push(newStudent);
  await writeData(students);
  return newStudent;
};
