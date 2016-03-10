var fs = require('fs');
var cars = __dirname + '/../../cars.json';
var readFile = require('../../readfiles.js');
var user = __dirname + '/../../user.json';

function delete1(req, cb){
   req.postedUser = true;
   readFile.readJson(user, chooseUser);
   function chooseUser(data){
      var users = data.users;
      req.chooseUser = users.find(function(x){
         return x['id-number'] == req.body.delete;
      });
      cb();
   }
}

function delete2(req,cb){
   readFile.readJson(user, deleteUsers);
   function deleteUsers(data){
      var arr = data.users;
      var userToRemove = arr.findIndex(function(x){
         return x['id-number'] == req.body.deleteRadio;
      });
      arr.splice(userToRemove,1);
      fs.writeFile(user, JSON.stringify(data,null,4),function(error){
         if(error){
            return console.log(error);
         }
      });
      req.userChange = true;
      cb();
   }
}

module.exports.delete1 = delete1;
module.exports.delete2 = delete2;
