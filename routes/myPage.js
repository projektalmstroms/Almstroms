var express = require('express');
var router = express.Router();
var user = __dirname + '/../user.json';
var userBookings = __dirname + '/../userBookings.json';
var readFile = require('../readfiles.js');
var fs = require('fs');


/* Läser av  Jsonfilen: userBookings. Utifrån den listan skapas en function där vi listar alla user i req.list
som ligger under bookings i jsonfilen. Utifrån den listan filtrerar vi ut och retunerar userID om det är lika med 
rätt id-nummer. */
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
/* Rendrar current list av bookings på myPage.jade dvs den listan som överenstämmer med det urvalet som gjordes i 
functionen */
router.get('/', function(req, res, next) {
  res.render('myPage', {
  	title: 'bookings',
  	current: req.list
  	});

});

module.exports = router;
