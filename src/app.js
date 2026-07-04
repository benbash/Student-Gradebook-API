import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import studentRoutes from "./routes/student.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const renderDashboard = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const response = await fetch(`${baseUrl}/students`);

    if (!response.ok) {
      throw new Error(`Failed to load students: ${response.status}`);
    }

    const students = await response.json();
    const totalStudents = students.length;
    const passCount = students.filter((student) => student.status === "Pass").length;
    const failCount = students.filter((student) => student.status === "Fail").length;
    const averageOfAverages = totalStudents
      ? Math.round(
          (students.reduce((sum, student) => sum + (student.average || 0), 0) / totalStudents) * 100
        ) / 100
      : 0;

    res.render("dashboard", {
      students,
      stats: {
        totalStudents,
        passCount,
        failCount,
        averageOfAverages,
      },
      lastUpdated: new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    });
  } catch (error) {
    res.status(500).render("dashboard", {
      students: [],
      stats: {
        totalStudents: 0,
        passCount: 0,
        failCount: 0,
        averageOfAverages: 0,
      },
      lastUpdated: new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      errorMessage: "Unable to load students from the backend right now.",
    });
  }
};

app.get("/", renderDashboard);
app.get("/dashboard", renderDashboard);

app.use("/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
