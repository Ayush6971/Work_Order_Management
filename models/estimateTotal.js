const { ObjectID } = require("bson");
const mongoose = require("mongoose");

const estimateSchema = new mongoose.Schema({
  etimateId: {
    type: ObjectID,
    ref: "Estimate",
  },
  total: {
    type: Number,
    required: true,
  },
});
