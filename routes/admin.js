// Sets modules and paths
var express = require('express');
var router = express.Router();
var fs = require('fs');
var cars = __dirname + '/../cars.json';
var readFile = require('../readfiles.js');
var user = __dirname + '/../user.json';
var activationModule = require('./admin/activation.js');
var newcarModule = require('./admin/newcar.js');
var approveModule = require('./admin/approveUser.js');
var deleteModule = require('./admin/removeUser.js');

// Sets false variables. Becomes true depending on which posts are made.
router.all('/', function (req, res, next){
	req.postCar = false;
   req.postAct = false;
	req.posteduser = false;
   req.activationChange = false;
	req.userChange = false;
	next();
});

// All unauthorized users is saved into req.autUser
router.all('/',function(req,res,next){
	readFile.readJson(user, autUser);
	function autUser(data){
		req.autUser = data.users.filter(function(x){
			return !x.authorized;
		});
		next();
	}
});

// Approving new users.
// If userOk exists in posted information call module and pass request object and next as parameters. Else go to next middleware.
router.post('/',function(req,res,next){
   if(req.body.userOk === undefined){
      next();
   }
   else{
      approveModule.authorizeUser(req, next);
   }
});

// Activating and deactivating attribute inspected in cars.json. Stage 1, find car.
// If activation exists in posted information call module and pass request object and next as parameters. Else go to next middleware.
router.post('/',function(req,res,next){
   if(req.body.activation === undefined){
      next();
   }
   else{
      activationModule.activate1(req, next);
   }
});

// Activating and deactivating attribute inspected in cars.json. Stage 2, make change.
// If activationRadio exists in posted information and has length of 6, i.e. a valid registraion call module and pass request object and next as parameters. If undefined or "Nej" go to next middleware.
router.post('/',function(req,res,next){
   if(req.body.activationRadio === undefined || req.body.activationRadio == "Nej"){
      next();
   }
   else if(req.body.activationRadio.length == 6){
      activationModule.activate2(req,next);
   }
});

// Removing users. Stage 1, find user.
// If delete exists in posted information call module and pass request object and next as parameters. Else go to next middleware.
router.post('/',function(req,res,next){
   if(req.body.delete === undefined){
      next();
   }
   else{
      deleteModule.delete1(req, next);
   }
});

// Removing users. Stage 2, remove user.
// If delete exists in posted information and has length call module and pass request object and next as parameters. If undefined or "Nej" go to next middleware.
router.post('/',function(req,res,next){
   if(req.body.deleteRadio === undefined || req.body.deleteRadio == "Nej"){
      next();
   }
   else if(req.body.deleteRadio.length > 0){
      deleteModule.delete2(req,next);
   }
});

// Creating new cars
// If registration exists in posted information call module and pass request object and next as parameters. If undefined go to rendering.
router.post('/', function (req, res, next) {
   if(req.body.registration === undefined){
      next();
   }
   else{
      req.postCar = true;
      req.check = false;
      newcarModule.newcarFunc(req,next);
  }
});

// Render to /admin.
router.all('/', function(req, res, next) {
  res.render('admin', { title: 'Admin', newCar: req.body, postedCar: req.postCar, postedAct: req.postAct, authorizedUser: req.autUser, checkedCar: req.check, activateCar: req.activateCar, change:req.activationChange, approved: req.userArray, postedUser: req.postedUser, deleted: req.userChange, employee: req.chooseUser });
});

module.exports = router;
