
const mongoose = require('mongoose');
const buffer = require('buffer');

const imgSchema = new mongoose.Schema({
    
   name:String,
   image:{
    data:{type: Buffer},
    contentType: String
   }
},
{ timestamps: true });

module.exports  = mongoose.model('image',imgSchema,'image')


