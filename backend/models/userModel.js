const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
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