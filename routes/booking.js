var express = require('express');
var router = express.Router();
var readFile = require('../readfiles.js');
var cars = __dirname + '/../cars.json';

/* GET home page. */
router.get('/', function(req, res, next) {
	readFile.readJson(cars, listCars);
	function listCars(json){ 
		req.list = json.cars
		next()
  
}
});

router.get('/', function(req, res, next) {
		var gearbox = req.query.vaxellada
		if(gearbox){

		req.list = req.list.filter(function(x){
			return gearbox == x.gearbox

		})
		next()
}
		else {
			console.log("no gearbox")
			next()
		}
});

router.get('/', function(req, res, next) {
		var bransletyp = req.query.bransletyp
		if(bransletyp){

		req.list = req.list.filter(function(x){
			return bransletyp == x.fuel

		})
		next()
}
		else {
			console.log("no fuel")
			next()
		}
});

router.get('/', function(req, res, next) {
		var fordonstyp = req.query.fordonstyp
		if(fordonstyp){

		req.list = req.list.filter(function(x){
			return fordonstyp.indexOf(x.type.replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o')) >= 0

		})
		next()
}
		else {
			console.log("no type")
			next()
		}
});

router.get('/', function(req, res, next) {
		
		res.render('booking', { 
	  title: 'cars', 
	  carArray: req.list
  		
   });

});


module.exports = router;

