const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const { connectDB } = require('./data/database');

dotenv.config({ path: "./config.env" });

const userRoutes = require("./routes/userRoutes");
const apartmentRoutes = require('./routes/apartmentsRoutes');
const messageRoutes = require("./routes/routesMessages");

const app = express();

// ------------------- CORS -------------------
// Make sure this is before any routes
app.use(cors({
  origin: process.env.FRONTEND_URL,  // Netlify URL
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Handle OPTIONS preflight requests globally
app.options("*", cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// ------------------- Middleware -------------------
app.use(express.json());

// ------------------- Routes -------------------
app.use("/", userRoutes);
app.use("/", apartmentRoutes);
app.use("/messages", messageRoutes);

// Catch-all for undefined routes 
app.all("*", (req, res) => {
  res.status(404).json({
    status: "failed",
    message: `Page not found.`,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ status: 'error', statusCode, message });
});

// ------------------- Start Server -------------------
const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  await connectDB();
  console.log("✅ Server started on port", PORT);
});
