var express = require('express');
var router = express.Router();
var user = __dirname + '/../user.json';
var userBookings = __dirname + '/../userBookings.json';
var readFile = require('../readfiles.js');
var fs = require('fs');


/* Read teh Jsonfile: userBookings and list the bookings for select user. From req.list we use the filter function. 
Use app.locals.appUser för att koppla det till rätt valt id-nummer */
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
/* Rendrar current list av bookings på myPage.jade*/
router.get('/', function(req, res, next) {
  res.render('myPage', {
  	title: 'bookings',
  	current: req.list
  	});

});

module.exports = router;
