var express = require('express');
var cors = require('cors');
var fileUpload = require('express-fileupload');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/commander-db', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

var commands = require('./routes/commands');
var foods = require('./routes/foods');
var drinks = require('./routes/drinks');
var meals = require('./routes/meals');
var rounds = require('./routes/rounds');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':false}));
app.use(fileUpload());
app.use(cors());
//app.use(express.static(path.join(__dirname, 'dist')));
//app.use('/api/commands', express.static(path.join(__dirname, 'dist')));
app.use('/api/commands', commands);
app.use('/api/foods', foods);
app.use('/api/drinks', drinks);
app.use('/api/meals', meals);
app.use('/api/rounds', rounds);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;