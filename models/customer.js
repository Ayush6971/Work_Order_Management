const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      unique: true,
      required: true,
      max: [10, "Max Length is 10 digits"],
    },
    isTokenPaid: {
      type: Boolean,
      required: true,
    },
    advance: {
      type: Number,
    },
    workOrderDate: {
      type: Date,
      required: true,
    },
    workOrderAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
