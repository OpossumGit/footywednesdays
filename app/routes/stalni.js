var express    = require('express');        // call express
var router = express.Router(); 

var Stalni = require('../models/stalni');

router.route('/stalni')
    // create a stalni (accessed at POST http://localhost:8080/api/stalni?name=tvrtko)
    .post(function(req, res) {
        
        var stalni = new Stalni();      // create a new instance of the model
        stalni.name = req.query.name;  // set the name (comes from the request)
	if (stalni.name.indexOf('*')!=-1){
	    stalni.name = stalni.name.replace(/\*/g,'').trim();
	    stalni.date = new Date(9999, 11, 31);
	}
        // save and check for errors
        stalni.save(function(err, stalni) {
            if (err)
                res.send(err);
	    else
                res.json({ message: stalni._id });
        });
    })
        
 /*   // get all stalni  (accessed at GET http://localhost:8080/api/stalni)
    .get(function(req, res) {
	Stalni.find(function(err, stalni) {
            if (err)
                res.send(err);
	    else
                res.json(stalni);
            });
        }) 
*/	
    // get all stalni since 7 days before end of month  (accessed at GET http://localhost:8080/api/stalni)
    .get(function(req, res) {
	var d = new Date();
	var midnight = new Date(d.getFullYear(),d.getMonth(),d.getDate(), 23, 59, 59, 999);
	var eoM = new Date(d.getFullYear(),d.getMonth() + 1, 0, 23, 59, 59, 999);
	var cutoffDate = new Date();
	if (eoM.getDate()-midnight.getDate() > 6) { 
		cutoffDate = new Date(d.getFullYear(), d.getMonth(), 0, 23, 59, 59, 999);
	}
	else {
		cutoffDate = eoM;
	}
	cutoffDate.setDate(cutoffDate.getDate() - 7);

	Stalni.find({"date": {$gt:cutoffDate}}, function(err, stalni) {
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
