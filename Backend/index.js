const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const { connectDB } = require('./data/database');
dotenv.config({ path: "./config.env" });
const userRoutes = require("./routes/userRoutes");
const apartmentRoutes = require('./routes/apartmentsRoutes')
const messageRoutes = require("./routes/routesMessages")
const app = express();

app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:5174",
      methods: "GET, POST, PUT, PATCH, DELETE",
      credentials: true,
    })
  );


app.use("/", userRoutes);
app.use("/", apartmentRoutes);
app.use("/messages",messageRoutes);

// Catch-all for undefined routes 
app.all("*", (req, res, next) => {
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

app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log("✅ Server started on port", process.env.PORT );});
