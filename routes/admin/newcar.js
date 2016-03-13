var fs = require('fs');
var cars = __dirname + '/../../cars.json';
var readFile = require('../../readfiles.js');
var user = __dirname + '/../../user.json';


/* Läser av Json filen "cars" för att kunna lägga till en ny bil i filen. Genom filter funktion sorteras reg.nr som övverensstämmer med req.body ut och retunerar om man efter kontrollerat reg nr existerar, annars skapas det en newCar som pushar upp in i Json filen. */
// Function for creating new car.
// Parameters: req equal to request object. cb is next()
// Gets data from cars.json.
// Checks if the added registration-number exists in list of cars. If it does calls next().
// If registration does not exist, the new car is pushed in to array of cars with value of inspected being set to true.
// Writes to file

function newcarFunc(req,cb){
   readFile.readJson(cars, carReg);
   function carReg(data){
      var checkedReg = data.cars.filter(function (reg){
         return reg.registration == req.body.registration;
      });
      if (checkedReg.length == 1) {
         req.check = true;
         cb()
      }
      else {
        var arr = data.cars;
        var newCar = req.body;
        newCar.inspected = true;
        arr.push(newCar);
        fs.writeFile(cars, JSON.stringify(data,null,4),function(error){
            if(error){
               return console.log(error);
            }
         });
         cb();
      }
   }
}

module.exports.newcarFunc = newcarFunc;
