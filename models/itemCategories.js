const mongoose = require('mongoose');

const itemCategories = new mongoose.Schema({
    itemId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Item'
    },
    itemCategoryName: {
        type: String,
        required: true
    },
    itemCategoryRate: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("ItemCategories", itemCategories);
