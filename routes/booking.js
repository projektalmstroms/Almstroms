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
/* Funktionen söker tillgängligheten på bilar från en startdatum till ett slutdatum från bookings.json*/
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
   /*Om urvalet är större än 7 dagar sätts req.tooManyDays in */
   function checkDates(data){
		if(req.allDays.length>7){
			req.tooManyDays = true;
		}
	/* Filtrerar och väljer ut alla datum mellan startdatum och slutdatum */
      var mapped = data.bookings.filter(function(x){
			for(var i in req.allDays){
				if(x.dates.indexOf(req.allDays[i]) >=0){
					return true;
				}
			}
      })
     /* Retunerar antalet bilar med matchat urval */
      .map(function(x){
         return x.car;
      });
      /* Filtrerar bilar som är inspected samtidigt som de filtreras mot datum. */
      req.list = req.list.filter(function(x){
         return mapped.indexOf(x.registration) < 0  && x.inspected === true;
      });
      next();
   }
});

	/* Skapar urval för dem olika valen genom if/else sats. */
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


router.get('/', function(req, res, next) {
	res.render('booking', {
	  title: 'cars',
	  carArray: req.list,
	  allDays: req.allDays,
	  tooMany: req.tooManyDays
   });

});


module.exports = router;
