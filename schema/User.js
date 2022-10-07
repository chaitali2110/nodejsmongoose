const { default: mongoose } = require("mongoose");

exports.userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    username : {
        type: String,
        required: true,
        unique:true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    verfied_token: {
        type: String,
        default: null,
    },
});

