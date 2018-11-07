var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ordbogSchema = new Schema({

  ord: { type: String, Required:  'Ord cannot be left blank.' },
  
  sprog: { type: String,     Required:  'Sprog cannot be left blank.'},
  
  user: { type: String ,    Required:  'User cannot be left blank.'},

  image: { type: String },

  sound: { type: String },

  video: { type: String },

  kategori: { type: String },

  date: { type: String ,  Required:  'Date cannot be left blank.' }

});

exports.ordbogSchema = ordbogSchema;