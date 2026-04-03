const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        minlength: 15,
        maxlength: 50,
        required: true
    },
    description: {
        type: String,
        minlength: 60,
        required: true
    },
    category: {
        type: String,
        enum: ['apartment', 'house', 'land', 'commercial', 'flat', 'Studio'],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'sold'],
        default: 'available'
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
},{
    timestamps:true
})



const Property = mongoose.model("Property", propertySchema)
module.exports = Property