const mongoose = require('mongoose')

const userSchema = new Schema({
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
    }
})

const User = mongoose.model('User', 'userSchema')
module.exports = User