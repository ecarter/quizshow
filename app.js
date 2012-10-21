
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , quiz = requize('./routes/quiz')
  , http = require('http')
  , path = require('path')
  , sio = require('socket.io')
  , mongoose = require('mongoose');

var app = express()
  , db = mongoose.connect('mongodb://localhost/quizshow')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

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
 * Models
 */

/**
 * Person Schema
 *
 *    name - Person's name
 *    secret - challenge question
 *    about - bio
 *    image - avatar
 */

var PersonSchema = new Schema({
  name: { type: String, required: true, index: { unique: true } }
, secret: String
, about: String
, image: String
});

db.model('Person', PersonSchema);

/**
 * Quiz Schema
 *
 *    name - quiz title
 *    body - description
 *    status - inactive (default) | active | closed
 *    owner - created by / quiz host
 *    format - timed | manual
 */

var QuizSchema = new Schema({
  name: String
, body: String
, status: { type: String, default: 'inactive' }
, questions: [ { question: ObjectId, order: Number } ]
, owner: ObjectId
, format: String
});

db.model('Quiz', QuizSchema);

/**
 * Question Schema
 *
 *    question - topic question
 *    answers - possible question answers
 */

var QuestionSchema = new Schema({
  question: String
, answers: [ { answer: ObjectId, order: Number } ]
});

db.model('Question', QuestionSchema);

/**
 * Answer Schema
 *
 *    answer - possible answer to question
 *    value - points
 */

var AnswerSchema = new Schema({
  answer: ObjectId
, value: Number
});

db.model('Answer', AnswerSchema);

/**
 * Answer Response Schema
 *
 *    answer - selected answer
 *    correct - true | false
 *    person - who answered?
 */

var ResponseSchema = new Schema({
  answer: ObjectId
, correct: Boolean
, person: ObjectId
});

db.model('Response', ResponseSchema);

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

