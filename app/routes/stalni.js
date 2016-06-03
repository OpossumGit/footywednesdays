var express    = require('express');        // call express
var router = express.Router(); 

var Stalni = require('../models/stalni');

router.route('/stalni')
    // create a prijava (accessed at POST http://localhost:8080/api/stalni?name=tvrtko)
    .post(function(req, res) {
        
        var stalni = new Stalni();      // create a new instance of the model
        stalni.name = req.query.name;  // set the name (comes from the request)
        // save and check for errors
        stalni.save(function(err, stalni) {
            if (err)
                res.send(err);
	    else
                res.json({ message: stalni._id });
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

module.exports = router;
