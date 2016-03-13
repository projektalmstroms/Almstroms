var fs = require('fs');
var cars = __dirname + '/../../cars.json';
var readFile = require('../../readfiles.js');
var user = __dirname + '/../../user.json';

// Function for activation/deactivation of cars.
// Parameters: req equal to request object. cb is next()
// Gets data from cars.json.
// Gets selected car and saves it into req.activateCar. Only used for showing requested car in jade-file.
function activate1(req, cb){
   req.postAct = true;
   readFile.readJson(cars, activateCar);
   function activateCar(data){
      var cars = data.cars;
      req.activateCar = cars.find(function(x){
         return x.registration == req.body.activation;
      });
      console.log(req.activateCar);
      console.log(req.body.activation);
      cb();
   }
}

// Function for activation/deactivation of cars.
// Parameters: req equal to request object. cb is next()
// Gets data from cars.json.
// Picks out selected car from cars.json. If car is activated sets inspected value to false. If car is not activated sets inspected value to true.
// Writes to file.
function activate2(req,cb){
   readFile.readJson(cars, finalActivateCar);
   function finalActivateCar(data){
      var arr = data.cars;
      var activationForCar = arr.find(function(x){
         return x.registration == req.body.activationRadio;
      });
      if (activationForCar.inspected === true){
         activationForCar.inspected = false;
      }
      else{
         activationForCar.inspected = true;
      }
      fs.writeFile(cars, JSON.stringify(data,null,4),function(error){
         if(error){
            return console.log(error);
         }
      });
      req.activationChange = true;
      cb();
   }
}

module.exports.activate1 = activate1;
module.exports.activate2 = activate2;
