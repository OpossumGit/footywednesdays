var express    = require('express');        // call express
var router = express.Router(); 

var Notifikacija = require('../models/notifikacija');

router.route('/notifikacija')
    // create a notifikaicja (accessed at POST http://localhost:8080/api/Notifikacija?text=tvrtko%20te%pozdravlja)
    .post(function(req, res) {
        
        var notifikacija = new Notifikacija();      // create a new instance of the model
        notifikacija.text = req.query.text;  // set the name (comes from the request)
        // save and check for errors
        notifikacija.save(function(err, notifikacija) {
            if (err)
                res.send(err);
	    else
                res.json({ message: notifikacija._id });
        });
    })
        
    // get latest notifikacija  (accessed at GET http://localhost:8080/api/notifikaicja)
    .get(function(req, res) {
	Notifikacija.findOne().sort({'date' : -1}).exec(function(err, notifikacija) {
            if (err)
                res.send(err);
	    else
                res.json(notifikacija);
            });
        

}) 

     // DELETE all http://localhost:8080/api/notifikacija
     .delete(function(req, res) {
        Notifikacija.remove({ }, function(err, stalni) {
            if (err)
                res.send(err);
            else
                res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;
