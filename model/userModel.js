var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    mobile_number: {
        type: Number,
        require: true
    },
    message: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('user',userSchema);