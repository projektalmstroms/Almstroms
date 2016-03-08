var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var booking = require('./routes/booking');
var carsData = __dirname + '/cars.json';
var userData = __dirname + '/user.json';
var readFile = require('./readfiles');
var list = require('./routes/list');
var booking = require('./routes/booking');
var confirmation = require('./routes/confirmation');
var newuser = require('./routes/newuser');
var adduser = require('./routes/adduser');
var newCar = require('./routes/newcar');

var app = express();
app.locals.appUser = "";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/booking', booking);
app.use('/list', list);
app.use('/confirmation', confirmation);
app.use('/newuser', newuser);
app.use('/adduser', adduser);
app.use('/newcar', newCar);

app.post('/login', function (req, res) {
   readFile.readJson(userData, loginUser);
   function loginUser(data){
      app.locals.appUser = data.users.filter(function(user){
         return user.email == req.body.username && req.body.password == user.password;
      });
      if (app.locals.appUser.length == 1) {
         res.writeHead(302,{'Location':'/booking'});
         res.end();
      }
      else {
         // res.render(__dirname + '/views/fellogin');
         console.log('wrong password');
      }
      console.log(app.locals.appUser);
   }
});

app.post('/logout',function(req,res){
   app.locals.appUser = "";
   res.writeHead(302,{'Location':'/'});
   res.end();
});

app.get('/*',function(req,res,next){
   if(app.locals.appUser.length == 1){
      next();
   }
   else{
      res.writeHead(302,{'Location':'/'});
      res.end();
   }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
