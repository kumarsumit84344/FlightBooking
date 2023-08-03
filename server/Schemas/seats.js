const mongoose = require('mongoose');


const prodSchema = new mongoose.Schema({
      SeatNo : Number,
      color : String,
      booked: Boolean,
      isSelected: Boolean,
      price: String,
});

module.exports  = mongoose.model('seats',prodSchema,'seats')
