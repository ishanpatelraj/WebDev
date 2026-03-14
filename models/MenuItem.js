const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    prices: {
        type: Number,
        required: true
    },
    taste : {
        type : String,
        enum : ['sweet', 'sour', 'spicy', 'bitter', 'salty'],
        required : true
    },
    isDrink : {
        type : Boolean,
        default : false
    },
    ingredients : {
        type : [String],
        default : []
    },
    numSales : {
        type : Number,
        default : 0
    }
})

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;