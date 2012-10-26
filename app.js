
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , sio = require('socket.io')
  , mongoose = require('mongoose')
  , Session = require('session-mongoose')
  , stylus = require('stylus')
  , nib = require('nib')
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

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));

/**
 * Environment
 */

app.configure('development', function(){
  app.use(express.errorHandler());
});

/**
 * Sessions
 */

var sessions = new Session({
  url: 'mongodb://' + config.MONGO_HOST + '/' + config.MONGO_DB
, interval: 12000
});

app.use(express.session({ store: sessions }));

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
 * Compiles Stylus to CSS
 */

function compile (str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

/**
 * Routes
 */

app.use(app.router);
app.use(stylus.middleware({ src: path.join(__dirname, './public'), compile: compile }));
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', user.session);
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/join', user.join);
app.post('/join', user.register);
app.get('/login', user.login);
app.post('/login', user.authLogin);
app.get('/logout', user.logout);
app.get('/quiz/:id', user.auth, quiz.index);

/**
 * Server
 */

var server = http.createServer(app);

/**
 * Events
 */

var quizzes = {};
var io = sio.listen(server);

io.sockets.on('connection', function(socket){
  //console.log('socket',socket);

  /**
   * Subscribes socket to lobby
   */

  socket.on('lobby', function(data){
    socket.join('lobby');
    io.sockets.in('lobby').emit('status', data);
  });

  /**
   * Subscribes socket to room
   */

  socket.on('subscribe', function(data){
    //console.log('subscribe', data.quiz);

    socket.join('quiz:' + data.quiz);

    if ( !quizzes[data.quiz] ) quizzes[data.quiz] = { players: {} };

    quizzes[data.quiz].players[data.user.name] = data.user;

    io.sockets.in('quiz:' + data.quiz)
      .emit('message', data)
      .emit('players', quizzes[data.quiz].players);
  });

  /**
   * Unsubscribes a socket form room
   */

  socket.on('unsubscribe', function(data){
    //console.log('unsubscribe', data.quiz);

    socket.leave('quiz:' + data.parent_id);
    delete quizzes[data.quiz].players[data.user.name];

    io.sockets.in('quiz:' + data.quiz)
      .emit('message', data)
      .emit('players', quiz[data.quiz].players);
  });

  /**
   * Sends message to sockets in room
   */

  socket.on('message', function(data){
    //console.log('message', data);
    io.sockets.in('quiz:' + data.quiz).emit('message', data);
  });

  /**
   * Sends question to sockets in room
   */

  socket.on('question', function(data){
    //console.log('question', data);
    io.sockets.in('quiz:' + data.quiz).emit('question', data);
  });

  /**
   * Starts quiz
   */

  socket.on('play', function(data){
    //console.log('play:', data.quiz);

    io.sockets.in('quiz:' + data.quiz)
      .emit('play')
      .emit('message', data);

    io.sockets.in('lobby').emit('status', data);
  });

  /**
   * Pauses quiz
   */

  socket.on('pause', function(data){
    //console.log('pause:', data.quiz);

    io.sockets.in('quiz:' + data.quiz)
      .emit('pause')
      .emit('message', data);

    io.sockets.in('lobby').emit('status', data);
  });

});

/**
 * Start
 */

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
