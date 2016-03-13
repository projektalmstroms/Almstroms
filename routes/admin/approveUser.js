var userData = __dirname + '/../../user.json';
var readFile = require('../../readfiles.js');
var fs = require('fs');

// Function for authorizing users.
// Parameters: req equal to request object. cb is next()
// Gets data from user.json.
// req.body.userOk is id of user(s) to be approved. Finds users with that id and changes authorization to true. Pushes user into req.userArray which is used to show approved user in jade-file.
// Filters req.autUser so that list of users to approve is updated with those just approved removed.
// Writes to file user.json.
function authorizeUser(req,cb){
   readFile.readJson(userData, okUser);
   function okUser(data){
      var users = data.users;
      req.userArray = [];
      var appUsers = [];
      for (var i in users) {
         if(req.body.userOk.indexOf(users[i]['id-number']) >= 0){
            users[i].authorized = true;
            req.userArray.push(users[i]);
            appUsers.push(users[i]['id-number']);
         }
      }
      req.autUser = req.autUser.filter(function(x){
         return appUsers.indexOf(x['id-number']) < 0;
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
