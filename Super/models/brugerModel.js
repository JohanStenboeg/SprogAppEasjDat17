var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BrugerSchema = new Schema({
    brugernavn : {type: String, required: true},
    kodeord : {type : String, required: true},
    rolle : {type: String, required: true},
    rewardLVL : {type : Number, required: false},
    contact : {type : String, required: false} 
});

exports.BrugerSchema = BrugerSchema;