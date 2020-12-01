const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    FirstName : {
        type : String,
        required : true,
        //unique:true
    },
    LastName : {
        type : String,
        required : true
    },
    email : {
        type: String,
        required : true,
        unique:true
        
    },
    role : {
        type : String,
        required : true
    }
},{collection:'data'})

module.exports = mongoose.model('data',schema)