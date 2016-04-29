var express    = require('express');        // call express
var app        = express();                 // define our app using express
//var bodyParser = require('body-parser');
var router = express.Router(); 
var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/static/favicon.ico'));

var mongoose   = require('mongoose');
var connectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost/footywednesdays'
mongoose.connect(connectionString);
var Prijava = require('./app/models/prijava');
var Stalni = require('./app/models/stalni');

// configure app to use bodyParser()
// this will let us get the data from a POST
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

var port = process.env.port || process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
router.route('/prijave')
    // create a prijava (accessed at POST http://localhost:8080/api/prijave?name=tvrtko)
    .post(function(req, res) {
        
        var prijava = new Prijava();      // create a new instance of the model
        prijava.name = req.query.name;  // set the name (comes from the request)
        // save and check for errors
        prijava.save(function(err) {
            if (err)
                res.send(err);
	    else
                res.json({ message: 'Prijava created!' });
        });
    })
        
    // get all prijave since last thursday (accessed at GET http://localhost:8080/api/prijave)
    .get(function(req, res) {
	var dif, d = new Date(); // Today's date
	dif = (d.getDay() + 3) % 7; // Number of days to subtract until thursday
	d = new Date(d - dif * 24*60*60*1000); // Do the subtraction
	d.setHours(0,0,0); // last thursday

        Prijava.find({"date": {$gt:d}}, function(err, prijave) {
            if (err)
                res.send(err);
	    else
                res.json(prijave);
            });
        }) 

     // DELETE http://localhost:8080/api/prijave?id=...
     .delete(function(req, res) {
        Prijava.remove({
            _id: req.query.id
        }, function(err, prijava) {
            if (err)
                res.send(err);
            else
                res.json({ message: 'Successfully deleted' });
        });
    });

router.route('/stalni')
    // create a prijava (accessed at POST http://localhost:8080/api/stalni?name=tvrtko)
    .post(function(req, res) {
        
        var stalni = new Stalni();      // create a new instance of the model
        stalni.name = req.query.name;  // set the name (comes from the request)
        // save and check for errors
        stalni.save(function(err) {
            if (err)
                res.send(err);
	    else
                res.json({ message: 'Stalni created!' });
        });
    })
        
    // get all stalni  (accessed at GET http://localhost:8080/api/stalni)
    .get(function(req, res) {
	Stalni.find(function(err, stalni) {
            if (err)
                res.send(err);
	    else
                res.json(stalni);
            });
        }) 

     // DELETE http://localhost:8080/api/stalni?id=...
     .delete(function(req, res) {
        Stalni.remove({
            _id: req.query.id
        }, function(err, stalni) {
            if (err)
                res.send(err);
            else
                res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// static files folder
app.use(express.static('static'));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
