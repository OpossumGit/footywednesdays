var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PrijavaSchema   = new Schema({
    name: { type:String, required: true},
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prijava', PrijavaSchema);
