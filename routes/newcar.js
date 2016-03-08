var express = require('express');
var router = express.Router();

router.use('/', function(req, res, next) {
   console.log('Works 1');
  next();
});

/* GET home page. */
router.post('/', function(req, res, next) {
   console.log('Works');
  res.render('newcar', { title: 'Express', body: req.body });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('newcar', { title: 'Express' });
});

module.exports = router;
