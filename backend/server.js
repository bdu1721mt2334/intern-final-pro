const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// 🔹 Import routes
const visitorRoutes = require("./routes/visitorRoutes");

const app = express();

// 🔹 Middleware
app.use(cors());
app.use(express.json());

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("Visitor Management Backend Running");
});

// 🔹 Use Visitor Routes
// This means: /api/visitors -> visitorRoutes
app.use("/api/visitors", visitorRoutes);

// 🔹 MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// 🔹 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
