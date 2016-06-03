var express    = require('express');        // call express
var router = express.Router(); 

var Prijava = require('../models/prijava');

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

module.exports = router;
