
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
},
   address:{
       type:String
   }},
     {
        timestamps: true
    });      

var Schools = mongoose.model('schools', SchoolSchema);
module.exports = Schools;