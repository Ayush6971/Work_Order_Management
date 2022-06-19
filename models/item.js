const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    itemRate: {
        type: String,
        required: true,
    },
    isDisabled: {
        type: Boolean,
        required: true,
        default: true
    },
    itemCategories: [{
        type: mongoose.Types.ObjectId,
        ref: 'ItemCategories',
    }]
}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);
