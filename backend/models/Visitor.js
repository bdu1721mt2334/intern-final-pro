const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    vehicleNumber: {
      type: String
    },
    visitorType: {
      type: String
    },
    purpose: {
      type: String
    },
    date: {
      type: String
    },
    time: {
      type: String
    },
    checkOutTime: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Visitor", visitorSchema);
