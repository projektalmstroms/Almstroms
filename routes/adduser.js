var express = require('express');
var router = express.Router();
var readFile = require('../readfiles.js');
var user = __dirname + '/../user.json';
var fs = require('fs');
// Först skriver jag ut req.body som är hela sidan av adduser.jade.
// Sen skriver jag en variabel newUser som är lika req.body, då Newuser blir ett objekt här.
// För att jag skriver över den gamla fil (user.json) behövs det att jag lägger till det en ny arrayen.
// Här skriver jag authorized = false eftersom det är en ny användare som inte godkänner nu.
// Sen vill jag pusha upp det i newUser objektet.
// Läser json filen och och lägg till den nya användare här.
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
// För att kunna visa upp informationen som man fyller in adduser formuläret, då skicker jag det i res.render.
// Här skiver jag nyckel med värde som jag kan hämta all information om den nya användaren i adduser i jade filen.
// Nyckeln är user och värdet är req.body.
router.post('/',function(req,res,next){
   res.render('addUser',{
      title: 'addUser',
      user: req.body
   });
});

module.exports = router;
