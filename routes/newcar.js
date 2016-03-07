var express = require('express');
var router = express.Router();
var fs = require('fs');
var cars = __dirname + '/../cars.json';
var readFile = require('../readfiles.js');

router.use('/', function (req, res, next){
	req.post = false
	next()
});

// check registration number
router.post('/', function (req, res, next) {
	req.post = true
	req.check = false 
	console.log(req.body)
  readFile.readJson(cars, carReg);

  function carReg(data){
  var checkedReg = data.cars.filter(function (reg){
    return reg.registration == req.body.registration;
  })
  if (checkedReg.length == 1) {
  req.check = true
  res.render('newcar', { title: 'Lägg till ny bil', checkedCar: req.check, posted: req.post });
  }
  else {
  	var arr = data.cars
  	var newCar = req.body 
  	arr.push(newCar);
  	  fs.writeFile(cars, JSON.stringify(data,null,4),function(error){
         if(error){
            return console.log(error);
         }
      });
    console.log('it´s done!');
    next()
  }

  }
})

/* GET home page. */
router.post('/', function(req, res, next) {
  res.render('newcar', { title: 'Lagt till ny bil', newCar: req.body, posted: req.post });
});

router.get('/', function(req, res, next) {
  res.render('newcar', { title: 'Lagt till ny bil', posted: req.post });
});

module.exports = router;