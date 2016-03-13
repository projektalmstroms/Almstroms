// Assigning variables to modules and paths.
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var booking = require('./routes/booking');
var carsData = __dirname + '/cars.json';
var userData = __dirname + '/user.json';
var readFile = require('./readfiles');
var list = require('./routes/list');
var booking = require('./routes/booking');
var confirmation = require('./routes/confirmation');
var newuser = require('./routes/newuser');
var adduser = require('./routes/adduser');
var admin = require('./routes/admin');
var myPage = require('./routes/myPage');
var middle = require('./routes/middle');
var favicon = require('serve-favicon');


var app = express();
// Setting up empty local variables for login-functionality. One for user, one for admin
app.locals.appUser = "";
app.locals.admin = "";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(path.join(__dirname, 'public', 'images/small-logo-.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Setting up routes for various stages of login. Always allowed to run.
app.use('/', routes);
app.use('/newuser', newuser);
app.use('/middle', middle);

// Posting to login from index. Reads from file user.json.
// If user email, password is correct and user is authorized the object of the user is saved into app.locals.appUser. If user also is admin, object is saved into app.locals.admin as well.
// Logged in user is redirected to booking-page.
app.post('/login', function (req, res) {
   readFile.readJson(userData, loginUser);
   function loginUser(data){
      app.locals.appUser = data.users.filter(function(user){
         return user.email == req.body.username && req.body.password == user.password && user.authorized === true;
      });
      app.locals.admin = data.users.filter(function(user){
         return user.email == req.body.username && req.body.password == user.password && user.authorized === true && user.role == 'ITadmin';
      });
      if (app.locals.appUser.length == 1) {
         res.writeHead(302,{'Location':'/booking'});
         res.end();
      }
      else {
         res.render('index',{wrong:true});
         console.log('wrong password');
      }
      console.log(app.locals.appUser);
   }
});

// Logout. If user presses logout-button. The local variables of appUser and admin is emptied.
app.post('/logout',function(req,res){
   app.locals.appUser = "";
   app.locals.admin = "";
   res.writeHead(302,{'Location':'/'});
   res.end();
});

// The login check. This applies to all request methods and all pages apart from the ones with routers already set up above.
// Checks if a user is logged in. If so: allows to run all routers below.
// If no user is logged in, all url:s is redirected to /middle where user is told he/she has to log in.
app.all('/*',function(req,res,next){
   if(app.locals.appUser.length == 1){
      next();
   }
   else{
      res.writeHead(302,{'Location':'/middle'});
      res.end();
   }
});

// Setting up more routes. Only accesible when conditions above are satisfied.
app.use('/booking', booking);
app.use('/list', list);
app.use('/confirmation', confirmation);
app.use('/adduser', adduser);
app.use('/myPage',myPage);


// Checks for logged in admin. If admin is logged in: allows for routes below. Else redirects to /middle.
app.all('/*',function(req,res,next){
   if(app.locals.admin.length == 1){
      next();
   }
   else{
      res.writeHead(302,{'Location':'/middle'});
      res.end();
   }
});

// Setting up route for admin. Only accesible if conditions above are satisfied.
app.use('/admin', admin);

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
