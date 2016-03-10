var fs = require('fs');
var cars = __dirname + '/../../cars.json';
var readFile = require('../../readfiles.js');
var user = __dirname + '/../../user.json';

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
