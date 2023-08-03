const mongoose = require('mongoose');
const buffer = require('buffer');

const flightSchema = new mongoose.Schema({
    name:  { type: String, unique: true },
    airport: String,
  
});

module.exports  = mongoose.model('flight',flightSchema,'flight')