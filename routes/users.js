var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
	console.log(req.body);
	res.json(req.body); //or return count for 1 & 0  
});

module.exports = router;
