const mongoose = require("mongoose");

const workOrderSchema = new mongoose.Schema(
  {
    workOrderNumber: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    workOrderAddress: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
      maxlength: 10,
    },
    advanceAmount: {
      type: String,
      // required: true,
    },
    workOrderDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Work Order", workOrderSchema);