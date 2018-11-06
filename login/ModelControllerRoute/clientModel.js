//MongoDB connector
var mongoose = require('mongoose');
//tillader at lave schema/tabel
var Schema = mongoose.Schema;


//Schema/tabel for Clienter
var ClientSchema = new Schema({
  brugernavn: {
    type: String,
    required: 'Skriv dit brugernavn'
  },
  password: {
    type: String,
    required: 'Skriv det password'
  },
  clientid: {
    type: String,
    required: 'Faa server til at lave id her.'
  }
});

//Exporter Schema(model) ud til andre klasser. 
module.exports = mongoose.model('Client', ClientSchema);