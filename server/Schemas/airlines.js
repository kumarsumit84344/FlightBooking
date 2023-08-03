const mongoose = require('mongoose');
const buffer = require('buffer');

const airlineSchema = new mongoose.Schema({
    name: String,
    source: String,
    sourceAirport: String,
    sourceAirportCode: String,
    departureTime: String,
    layover: String,
    destination: String,
    destinationAirport: String,
    destinationAirportCode: String,
    arrivalTime: String,
    fare:String,
    duration:String
  
});

module.exports  = mongoose.model('airlines',airlineSchema,'airlines')