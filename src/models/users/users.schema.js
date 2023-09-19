const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "is required"],
        index: true,
        match: [/^[a-zA-Z0-9.]+$/, 'is invalid'],
        lowercase: true
    },
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "is required"],
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    password:{
        type: String,
        required: [true, "is required"],     
        minLength: 6,
        maxLength: 255,
        trim: true
    },
    accessToken: { 
        type: String, 
        default: null 
    }
}, {timestamps: true} );

module.exports = mongoose.model("Users", usersSchema);