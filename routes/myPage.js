var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('myPage', { title: 'Express' });
});
module.exports = router;
