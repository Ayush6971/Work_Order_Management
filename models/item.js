const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemNumber:{
        type: Number, 
        // required: true
    },
    itemName: {
        type: String, 
        required: true
    },
    rate:{
        type: String,
        required: true,
    }
},{ timestamps: true });

module.exports = mongoose.model("Item", itemSchema);
