var express = require('express');
var router = express.Router();
var readFile = require('../readfiles.js');
var cars = __dirname + '/../cars.json';
var bookings = __dirname + '/../bookings.json';
var getDates = require('../getDates');

/* GET home page. */
router.get('/', function(req, res, next) {
	readFile.readJson(cars, listCars);
	function listCars(json){
		req.list = json.cars;
		req.tooManyDays = false;
		next();

}
});

router.get('/', function(req, res, next) {
	var fromDate = req.query.startdate;
   var toDate = req.query.enddate;
	if(fromDate){
      req.allDays = getDates.getDates(fromDate,toDate);
      readFile.readJson(bookings,checkDates);
   }
   else{
      next();
   }
   function checkDates(data){
		if(req.allDays.length>7){ 
			req.tooManyDays = true;
		}
      var mapped = data.bookings.filter(function(x){
			for(var i in req.allDays){
				if(x.dates.indexOf(req.allDays[i]) >=0){
					return true;
				}
			}
      })
      .map(function(x){
         return x.car;
      });
      req.list = req.list.filter(function(x){
         return mapped.indexOf(x.registration) < 0;
      });
      next();
   }
});


router.get('/', function(req, res, next) {
		var gearbox = req.query.vaxellada;
		if(gearbox){

		req.list = req.list.filter(function(x){
			return gearbox == x.gearbox;

		});
		next();
}
		else {
			console.log("no gearbox");
			next();
		}
});

router.get('/', function(req, res, next) {
		var bransletyp = req.query.bransletyp;
		if(bransletyp){

		req.list = req.list.filter(function(x){
			return bransletyp == x.fuel;

		});
		next();
}
		else {
			console.log("no fuel");
			next();
		}
});

router.get('/', function(req, res, next) {
		var fordonstyp = req.query.fordonstyp;
		if(fordonstyp){

		req.list = req.list.filter(function(x){
			return fordonstyp.indexOf(x.type.replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o')) >= 0;

		});
		next();
}
		else {
			console.log("no type");
			next();
		}
});

/*router.get('/', function(req, res, next){
		var privatlan = req.query.privatlan;
		if(privatlan) {
			req.list = req.list(function(x){
				return privatlan == x.privatlan;
			});
			next();
		}
		else {
			console.log("no privatlan");
			next();
		}
}); */

router.get('/', function(req, res, next) {
	res.render('booking', {
	  title: 'cars',
	  carArray: req.list,
	  allDays: req.allDays,
	  tooMany: req.tooManyDays
   });

});


module.exports = router;
