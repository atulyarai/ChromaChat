import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to the database
connectDB();

// Middleware to parse JSON bodies and cookies
app.use(express.json());
app.use(cookieParser());

// CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
