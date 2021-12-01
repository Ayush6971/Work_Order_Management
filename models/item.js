const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
    itemName: {
        type: String, 
        required: true
    }
},{ timestamps: true });

module.exports = mongoose.model("Item", itemsSchema);