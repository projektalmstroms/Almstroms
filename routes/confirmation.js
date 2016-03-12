// Assigning variables for modules and paths.
var express = require('express');
var router = express.Router();
var readFile = require('../readfiles.js');
var bookings = __dirname + '/../bookings.json';
var userBookings = __dirname + '/../userBookings.json';
var getDates = require('../getDates');
var fs = require('fs');

// When user presses booking-button, info is sent to confirmation.
// Bookinginfo is a string containing: 1. A registration number. 2. Model of car. 3. All the dates for the booking. Splits the string into array. req.dates contains all the dates in the booking (maximum of seven days allowed).
// req.user is the object containing the logged in user.
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

// Read file bookings.json. Passes data to function.
router.post('/',function(req,res,next){
   readFile.readJson(bookings,writeBookings);
   function writeBookings(data){
      var bookingsList = data.bookings;
      var existing = 0;
      // Checks if selected car has been booked before. If so passes object to variable existing.
      for(var i in bookingsList){
         if(bookingsList[i].car == req.carReg){
            existing = bookingsList[i];
         }
      }
      // If car has been booked before. Pushes in dates into the array 'dates' of the object of the car.
      if(existing){
         for (var d in req.dates){
            existing.dates.push(req.dates[d]);
         }
      }
      // If car has not been booked before. Creates a new object.
      else{
         var newBooking = {
            car: req.carReg,
            dates: req.dates
         };
         bookingsList.push(newBooking);
      }
      // Writes to file bookings.json with new info added.
      fs.writeFile(bookings, JSON.stringify(data,null,4),function(error){
         if(error){
            return console.log(error);
         }
      });
      next();
   }
});

// Reads file userBookings.json. Passes data to function.
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
      // Sets variable existing to false. Used if user has booked car before.
      // Creates object for new booking if user has booked before.
      var userBookingsList = data.bookings;
      var existing = false;
      var newUserBooking = {
         car: req.carReg,
         model: req.carModel,
         start: req.startDate,
         end: req.endDate,
         privat : req.lan
      };
      // Checks if logged in user has booked a car before. If so: existing is true and object is pushed into array in userBookings.json.
      for(var i in userBookingsList){
         if(userBookingsList[i].userID == req.user['id-number']){
            existing = true;
            userBookingsList[i].orders.push(newUserBooking);
         }
      }
      // If logged in user has not booked before creates a new object including information about user. Pushes the object into array.
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
      // Writes to file userBookings.json. New info added.
      fs.writeFile(userBookings, JSON.stringify(data,null,4),function(error){
         if(error){
            return console.log(error);
         }
      });
      next();
   }
});


// Render to /confirmation. Passes info for booking confirmation.
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
