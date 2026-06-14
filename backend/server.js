import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from "./utils/db.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import atsRoutes from "./routes/atsRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import webhookRoutes from "./routes/webhook.js";
import emailRoutes from "./routes/emailRoutes.js";

dotenv.config({ path: "./.env" });
const app = express();
const allowedOrigin = process.env.CLIENT_URL?.replace(/\/$/, '');
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));
app.use(express.raw({ limit: 50 * 1024 * 1024 }))

app.use("/api/webhook", express.raw({ type: 'application/json', limit: 50 * 1024 * 1024 }), webhookRoutes);
app.use(express.json({ limit: 50 * 1024 * 1024 }));

console.log("Running from:", process.cwd());
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/ats", atsRoutes);
app.use("/api/agent", agentRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/email', emailRoutes);

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