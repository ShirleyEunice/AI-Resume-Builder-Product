import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from "./utils/db.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import atsRoutes from "./routes/atsRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/api/resume", resumeRoutes);
app.use("/api/ats", atsRoutes);

const PORT = process.env.PORT || 5000;

// ✅ FIX: start server ONLY after DB connects
const startServer = async () => {
  try {
    await connectDB();   // ⬅️ VERY IMPORTANT

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();