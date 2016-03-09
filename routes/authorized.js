var express = require('express');
var router = express.Router();
var user = __dirname + '/../user.json';
var readFile = require('../readfiles.js');
var fs = require('fs');

router.post('/', function(req,res,next){
   console.log(req.body);
   readFile.readJson(user, okUser);
   function okUser(data){
      var users = data.users;
      req.userArray = [];
      for (var i in users) {
         if(req.body.userOk.indexOf(users[i]['id-number']) >= 0){
            users[i].authorized = true;
            req.userArray.push(users[i]);
         }
      }
      fs.writeFile(user, JSON.stringify(data,null,4),function(error){
         if(error){
            return console.log(error);
         }
      });
      next();
   }
});

router.post('/', function(req,res,next){
   res.render('authorized', {
      title: 'Express',
      approved: req.userArray
   });
});

module.exports = router;
