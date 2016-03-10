var express = require('express');
var router = express.Router();
var user = __dirname + '/../user.json';
var userBookings = __dirname + '/../userBookings.json';
var readFile = require('../readfiles.js');
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
	readFile.readJson(userBookings, listBookings);
	function listBookings(json){
		req.list = json.bookings;
		console.log(req.list)
		req.list = req.list.filter(function(x){
			return x.userID == req.app.locals.appUser[0]['id-number']

			});
		console.log(req.list)
		next();
	}
});

router.get('/', function(req, res, next) {
  res.render('myPage', {
  	title: 'bookings',
  	current: req.list
  	});

});

module.exports = router;
