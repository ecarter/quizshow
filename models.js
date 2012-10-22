/**
 * Module Dependencies
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , db = mongoose.connection;

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

