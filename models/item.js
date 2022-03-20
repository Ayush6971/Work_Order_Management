const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");

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
        type: Number,
        required: true,
    }
},{ timestamps: true });

// itemSchema.pre('save', function(next) {
 
//     let sno = 1;
//     var itemName = this;
//     itemSchema.find({}, function(err, itemName) {
//     if (err) throw err;
//         sno = itemName.length + 1;
//         itemName.sno = sno;
//         next();
//     });
// });

module.exports = mongoose.model("Item", itemSchema);
