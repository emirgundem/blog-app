const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        min: 1,
        max : 255,
        unique : true,
        required : true,
    },

    email : {
        type : String,
        unique : true,
        required : true,
        min :3,
        max : 255,
    },

    password : {
        type : String,
        unique : true,
        required : true,
        min : 4,
        max : 255,
    }
})


module.exports = mongoose.model('users',userSchema);
