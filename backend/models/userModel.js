const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["seller", "buyer"],
        default: "buyer",
    },
    otp: {
        type: Number,
    },
    isOtpVerified: {
        type: Boolean,
        default: false,
    }
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema)
module.exports = User