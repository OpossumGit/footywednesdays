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

// routes for our API
var defaultRouter=require('./app/routes/default');
var welcomeRouter=require('./app/routes/welcome');
var prijaveRouter=require('./app/routes/prijava');
var stalniRouter=require('./app/routes/stalni');
var nemoguRouter=require('./app/routes/nemogu');

// REGISTER OUR ROUTES
app.use(defaultRouter);
app.use('/api', welcomeRouter);
app.use('/api', prijaveRouter);
app.use('/api', stalniRouter);
app.use('/api', nemoguRouter);

// static files folder
app.use(express.static('static'));

module.exports = app;

