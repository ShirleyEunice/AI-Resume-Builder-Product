import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from "./utils/db.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import atsRoutes from "./routes/atsRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import webhookRoutes from "./routes/webhook.js";

dotenv.config({ path: "./.env" });
const app = express();
app.use(cors());
app.use(express.raw())

app.use("/api/webhook", express.raw({type:'application/json'}), webhookRoutes);
app.use(express.json());

console.log("Running from:", process.cwd());
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/api/resume", resumeRoutes);
app.use("/api/ats", atsRoutes);
app.use("/api/agent", agentRoutes);
app.use('/api/payment', paymentRoutes);

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