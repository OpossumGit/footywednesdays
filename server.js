var express    = require('express');        // call express
var app        = express();                 // define our app using express
//var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/static/favicon.ico'));

var mongoose   = require('mongoose');
var connectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost/footywednesdays'
mongoose.connect(connectionString);

// configure app to use bodyParser()
// this will let us get the data from a POST
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

var port = process.env.port || process.env.PORT || 8080;        // set our port

// routes for our API
var defaultRouter=require('./app/routes/default.js');
var welcomeRouter=require('./app/routes/welcome.js');
var prijaveRouter=require('./app/routes/prijava.js');
var stalniRouter=require('./app/routes/stalni.js');
var nemoguRouter=require('./app/routes/nemogu.js');

// REGISTER OUR ROUTES
app.use(defaultRouter);
app.use('/api', welcomeRouter);
app.use('/api', prijaveRouter);
app.use('/api', stalniRouter);
app.use('/api', nemoguRouter);

// static files folder
app.use(express.static('static'));

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);
