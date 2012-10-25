
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , sio = require('socket.io')
  , mongoose = require('mongoose')
  , config = require('./config')
  , db = exports.db = mongoose.createConnection(config.MONGO_HOST, config.MONGO_DB)
  , models = require('./models')
  , routes = require('./routes')
  , user = require('./routes/user')
  , quiz = require('./routes/quiz');

var app = exports.app = express();

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
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/**
 * Global Locals
 *
 *   - app_title - config.title
 */

app.use( function (req, res, next) {
  res.locals.app_title = config.title;
  next();
});

/**
 * Routes
 */

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/join', user.join);
app.post('/register', user.register);
app.get('/quiz/:id', quiz.index);

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

