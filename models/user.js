const mongoose = require("mongoose");
const { ObjectID } = require('bson');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true,
        maxlength: 32,
        trim: true,
    },
    lastName: {
        type: String, 
        required: true,
        maxlength: 32,
	    trim: true,
    },
    phoneNo : { 
        type: Number,
        unique: true,
        required : true,
        maxlength: 10
    },
	password:{
		type: String,
		required: true,
	},
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true
    },
    role: {
        type: ObjectID,
        ref:'Role'
    },
    isBlocked: {
        type: Boolean,
		required: true,
        default: false
    }
},{ timestamps: true });


module.exports = mongoose.model("User", userSchema);