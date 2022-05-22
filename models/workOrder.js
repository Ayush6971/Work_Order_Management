const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const workOrderSchema = new mongoose.Schema(
  {
    estimateNumber: {
      type: Number,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
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

workOrderSchema.plugin(autoIncrement, { id: "estimateNumber_sequence", inc_field: 'estimateNumber' })

module.exports = mongoose.model("Work Order", workOrderSchema);
