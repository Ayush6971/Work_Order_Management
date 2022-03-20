const { ObjectID } = require("bson");
const mongoose = require("mongoose");

const estimateSchema = new mongoose.Schema(
  {
    workOrderId: {
      type: ObjectID,
      ref: "workOrder",
    },
    itemId: {
      type: ObjectID,
      ref: "Item",
    },
    itemDescription: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      max: [10, "Max Length is 10 digits"],
    },
    rate: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Estimate", estimateSchema);
