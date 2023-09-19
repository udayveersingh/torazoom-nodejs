const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content : {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
}, {timestamps: true});

module.exports = mongoose.model("Blogs", blogsSchema);