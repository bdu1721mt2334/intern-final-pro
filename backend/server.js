const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const visitorRoutes = require("./routes/visitorRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Visitor Management Backend Running");
});

app.use("/api/visitors", visitorRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
