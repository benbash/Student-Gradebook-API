import express from "express";
import studentRoutes from "./routes/student.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running smoothly on http://localhost:${PORT}`);
});
