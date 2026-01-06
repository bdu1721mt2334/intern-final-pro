const express = require("express");
const router = express.Router();

const {
  addVisitor,
  getVisitors,
  checkOutVisitor
} = require("../controllers/visitorController");

// Add visitor
router.post("/", addVisitor);

// Get all visitors
router.get("/", getVisitors);

// Checkout visitor
router.put("/checkout/:id", checkOutVisitor);

module.exports = router;
