var express    = require('express');        // call express
var router = express.Router(); 

var Nemogu = require('../models/nemogu');

router.route('/nemogu')
    // create a nemogu (accessed at POST http://localhost:8080/api/nemogu?name=tvrtko)
    .post(function(req, res) {
        
        var nemogu = new Nemogu();      // create a new instance of the model
        nemogu.name = req.query.name;  // set the name (comes from the request)
        // save and check for errors
        nemogu.save(function(err) {
            if (err)
                res.send(err);
	    else
                res.json({ message: 'Nemogu created!' });
        });
    })
        
    // get all nemogu  (accessed at GET http://localhost:8080/api/nemogu)
    .get(function(req, res) {
	var dif, d = new Date(); // Today's date
	dif = (d.getDay() + 3) % 7; // Number of days to subtract until thursday
	d = new Date(d - dif * 24*60*60*1000); // Do the subtraction
	d.setHours(0,0,0); // last thursday

        Nemogu.find({"date": {$gt:d}}, function(err, nemogu) {
            if (err)
                res.send(err);
	    else
                res.json(nemogu);
            });

        }) 

     // DELETE http://localhost:8080/api/nemogu?id=...
     .delete(function(req, res) {
        Nemogu.remove({
            _id: req.query.id
        }, function(err, nemogu) {
            if (err)
                res.send(err);
            else
                res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;
