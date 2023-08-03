const mongoose = require('mongoose');


const prodSchema = new mongoose.Schema({
      Title: String,
      FirstName : String,
      LastName: String,
      Email: String,
      Contact: String,
});

module.exports  = mongoose.model('traveller',prodSchema,'traveller')
