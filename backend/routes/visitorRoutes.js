const express = require("express");
const router = express.Router();

const {
  addVisitor,
  getVisitors,
  checkOutVisitor
} = require("../controllers/visitorController");

router.post("/", addVisitor);

router.get("/", getVisitors);

router.put("/checkout/:id", checkOutVisitor);

module.exports = router;
