const mongoose = require("mongoose");
console.log("callded")
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
        type: Number,
        default: 0,
    },
},{ timestamps: true });


module.exports = mongoose.model("User", userSchema);