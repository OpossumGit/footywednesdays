var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var NotifikacijaSchema   = new Schema({
    text: { type:String, required: true},
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notifikacija', NotifikacijaSchema);
