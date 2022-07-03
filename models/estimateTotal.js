const mongoose = require("mongoose");

const estimateTotalSchema = new mongoose.Schema({
  workOrderId: {
    type: mongoose.Types.ObjectId,
    ref: "WorkOrder",
  },
  estimateTotal: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("EstimateTotal", estimateTotalSchema);