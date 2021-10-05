const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },

    description : {
        type : String,
        required : true,
    },

    photo: {
        type : String,
        default : false,
    },

    username : {
        type : String,
        required : true,
    },
    categories : {
        type:Array,
        required : true
    }

},{timestamps:true})


module.exports = mongoose.model('Post',postSchema);