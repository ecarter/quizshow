
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , sio = require('socket.io')
  , mongoose = require('mongoose')
  , db = mongoose.createConnection('localhost', 'quizshow')
  , models = require('./models')
  , user = require('./routes/user')
  , quiz = require('./routes/quiz');

var app = express();

/**
 * Config
 */

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/**
 * Routes
 */

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/quiz/:id', quiz.detail);

/**
 * Server
 */

var server = http.createServer(app);

app.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

/**
 * Events
 */

var io = sio.listen(server);

io.sockets.on('connection', function(socket){
  console.log('socket',socket);
});

