const mongoose = require("mongoose");

const estimateSchema = new mongoose.Schema({
  etimateId: {
    type: mongoose.Types.ObjectId,
    ref: "Estimate",
  },
  total: {
    type: Number,
    required: true,
  },
});
