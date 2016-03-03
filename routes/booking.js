var express = require('express');
var router = express.Router();
var readFile = require('../readfiles.js');
var cars = __dirname + '/../cars.json';

/* GET home page. */
router.get('/', function(req, res, next) {
	readFile.readJson(cars, listCars);
	function listCars(json){ 
		var list = json.cars
		

		res.render('booking', { 
	  title: 'cars', 
	  carArray: list
  
   });
}
});

module.exports = router;
