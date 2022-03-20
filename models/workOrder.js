const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

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
      type: Number,
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

autoIncrement.initialize(mongoose.connection)
workOrderSchema.plugin(autoIncrement.plugin, {
  model: "workOrder",
  field: "workOrderNumber",
  startAt: 001,
  incrementBy: 1,
});