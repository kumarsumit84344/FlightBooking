const mongoose = require('mongoose');
const buffer = require('buffer');

const prodSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    date_of_birth: String,
    password: String,
},
{ timestamps: true });

module.exports  = mongoose.model('user',prodSchema,'user')


