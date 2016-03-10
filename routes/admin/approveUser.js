var userData = __dirname + '/../../user.json';
var readFile = require('../../readfiles.js');
var fs = require('fs');

function authorizeUser(req,cb){
   readFile.readJson(userData, okUser);
   function okUser(data){
      var users = data.users;
      req.userArray = [];
      for (var i in users) {
         if(req.body.userOk.indexOf(users[i]['id-number']) >= 0){
            users[i].authorized = true;
            req.userArray.push(users[i]);
         }
      }
      req.autUser = req.autUser.filter(function(x){
         for(var i in req.userArray){
         return req.userArray[i]['id-number'].indexOf(x['id-number']);
         }
      });
      fs.writeFile(userData, JSON.stringify(data,null,4),function(error){
         if(error){
            return console.log(error);
         }
      });
      cb();
   }
}

module.exports.authorizeUser = authorizeUser;
