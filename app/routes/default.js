var express    = require('express');        // call express
var router = express.Router(); 

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging... todo: logging framework
    console.log(req.headers['user-agent'] + " " + req.method + " " + req.url);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); // make sure we go to the next routes and don't stop here
});

module.exports = router;
