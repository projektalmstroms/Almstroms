var express = require('express');
var router = express.Router();
var readFile = require('../readfiles.js');
var user = __dirname + '/../user.json';

/* GET home page. */

router.post('/', function (req, res, next){
	console.log(req.body);
    var newUser = req.body;
    console.log(newUser.name)
    readFile.readJson(user, listUser);
    function listUser(data){ 
  		var arr = data.users;
  	    arr.push(newUser);
  	    console.log(newUser);

  
  	next()
	}
});


router.post('/', function(req, res, next) {
  res.render('adduser', { 
  	title: 'adduser',
  	user :req.body,
  	
  	

  	 });
  
});


module.exports = router;