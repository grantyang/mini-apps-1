const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/csvdatabase');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to mongoose!!!')
  // we're connected!
});

//Define a schema
var fileSchema = new mongoose.Schema({
    jsonFile: String,
    csvFile: String
});

// Compile model from schema
var filesModel = mongoose.model('filesModel', fileSchema );
module.exports.filesModel = filesModel;