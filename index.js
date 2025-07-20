import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

import router from "./routes/Postman.js";
import generateImage from "./routes/GenerateImage.js";

dotenv.config();

const app = express();

// ✅ CORS Configuration
const corsOptions = {
  origin: "https://image-generator-app-blue.vercel.app", // 🔥 Remove trailing slash
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// ✅ Apply CORS before other middlewares
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight

// ✅ Body parsers
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/post", router);
app.use("/api/generateImage", generateImage);

// ✅ Root route
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello Yuhdi Developers!",
  });
});

// ✅ Error handler — LAST
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});
