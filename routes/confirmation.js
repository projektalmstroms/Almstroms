var express = require('express');
var router = express.Router();
var readFile = require('../readfiles.js');
var bookings = __dirname + '/../bookings.json';
var userBookings = __dirname + '/../userBookings.json';
var getDates = require('../getDates');
var fs = require('fs');

/* GET home page. */
router.post('/', function(req, res, next) {
   var bookingInfo = req.body.book.split(',');
   req.user = req.app.locals.appUser[0];
   req.carReg = bookingInfo[0];
   req.carModel = bookingInfo[1];
   req.startDate = bookingInfo[2];
   req.endDate = bookingInfo[bookingInfo.length - 1];
   req.dates = bookingInfo.splice(2,bookingInfo.length-1);
   next();
});

router.post('/',function(req,res,next){
   readFile.readJson(bookings,writeBookings);
   function writeBookings(data){
      var bookingsList = data.bookings;
      var existing = 0;
      for(var i in bookingsList){
         if(bookingsList[i].car == req.carReg){
            existing = bookingsList[i];
         }
      }
      if(existing){
         for (var d in req.dates){
            existing.dates.push(req.dates[d]);
         }
      }
      else{
         var newBooking = {
            car: req.carReg,
            dates: req.dates
         };
         bookingsList.push(newBooking);
      }
      fs.writeFile(bookings, JSON.stringify(data,null,4),function(error){
         if(error){
            return console.log(error);
         }
      });
      next();
   }
});

router.post('/',function(req,res,next){
   readFile.readJson(userBookings,writeUserBookings);
   function writeUserBookings(data){
      var privatlan = req.body.privatlan;
      if (privatlan == 'lan'){
         req.lan = true;
      }
      else{
         req.lan = false;
      }
      var userBookingsList = data.bookings;
      var existing = false;
      var newUserBooking = {
         car: req.carReg,
         model: req.carModel,
         start: req.startDate,
         end: req.endDate,
         privat : req.lan

      };
      
      for(var i in userBookingsList){
         if(userBookingsList[i].userID == req.user['id-number']){
            existing = true;
            userBookingsList[i].orders.push(newUserBooking);
         }
      }
      if(!existing){
         newUserBooking = {
            userID: req.user['id-number'],
            orders: [
               {
                  car: req.carReg,
                  model: req.carModel,
                  start: req.startDate,
                  end: req.endDate,
                  privat : req.lan
               }
            ]
         };
         userBookingsList.push(newUserBooking);
      }
      fs.writeFile(userBookings, JSON.stringify(data,null,4),function(error){
         if(error){
            return console.log(error);
         }
      });
      next();
   }
});



router.post('/', function(req, res, next) {
  res.render('confirmation', {
     title: 'Express',
     registration: req.carReg,
     model: req.carModel,
     start: req.startDate,
     end: req.endDate
  });
});

module.exports = router;
