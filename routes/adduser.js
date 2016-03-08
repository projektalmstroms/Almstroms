var express = require('express');
var router = express.Router();
var readFile = require('../readfiles.js');
var user = __dirname + '/../user.json';
var fs = require('fs');

router.post('/',function(req,res,next){
   console.log(req.body);
   var newUser = req.body;
   readFile.readJson(user,listUser);
   function listUser(data){
      var arr = data.users;
      newUser.authorized = false
      arr.push(newUser);
      console.log(newUser);
       fs.writeFile(user, JSON.stringify(data,null,4),function(error){
         if(error){
            return console.log(error);
         }
      });
   }
   next();
});

router.post('/',function(req,res,next){
   res.render('addUser',{
      title: 'addUser',
      user: req.body
   });
});

module.exports = router;
