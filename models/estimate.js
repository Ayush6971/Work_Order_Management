const mongoose = require("mongoose");

const estimateSchema = new mongoose.Schema(
  {
    workOrderId: {
      type: mongoose.Types.ObjectId,
      ref: "WorkOrder",
    },
    itemId: {
      type: mongoose.Types.ObjectId,
      ref: "Item",
    },
    itemCategoriesId: [{
      type: mongoose.Types.ObjectId,
      ref: "ItemCategories",
    }],
    itemName: {
      type: String,
      required: true,
    },
    itemQuantity: {
      type: Number,
      required: true,
    },
    itemRate: {
      type: Number,
      required: true,
    },
    itemAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Estimate", estimateSchema);
