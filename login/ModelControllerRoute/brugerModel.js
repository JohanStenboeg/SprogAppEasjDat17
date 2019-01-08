var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BrugerSchema = new Schema({
    username : {type: String, required: true},
    password : {type : String, required: true},
    privilege : {type: String, required: true},
    rewardLVL : {type : Number, required: false},
    contact : {type : String, required: false} 
});

exports.BrugerSchema = BrugerSchema;