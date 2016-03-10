var fs = require('fs');
var cars = __dirname + '/../../cars.json';
var readFile = require('../../readfiles.js');
var user = __dirname + '/../../user.json';

function newcarFunc(req,cb){
   readFile.readJson(cars, carReg);
   function carReg(data){
      var checkedReg = data.cars.filter(function (reg){
         return reg.registration == req.body.registration;
      });
      if (checkedReg.length == 1) {
         req.check = true;
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
