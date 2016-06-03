// START THE SERVER
var app = require('./app');
var port = process.env.port || process.env.PORT || 8080;        // set our port

app.listen(port);
console.log('Magic happens on port ' + port);
