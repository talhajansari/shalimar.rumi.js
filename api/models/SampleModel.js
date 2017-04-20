// define model =================
var mongoose     = require('mongoose');

var Sample = mongoose.model('Sample', {
    text : String
 });

module.exports = Sample