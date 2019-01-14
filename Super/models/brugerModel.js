var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BrugerSchema = new Schema({
    brugernavn : {type: String, required: true},
    kodeord : {type : String, required: true},
    rolle : {type: String, required: true},
    rewardLvL : {type : Number, required: false} 
});

exports.BrugerSchema = BrugerSchema;