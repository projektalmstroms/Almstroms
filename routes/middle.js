var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('middle', { title: 'Du är inte inloggad' });
});

module.exports = router;
