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
, admin: Boolean
});

db.model('Person', PersonSchema);

/**
 * Question Schema
 *
 *    question - topic question
 *    answer - answer to topic question
 *    choices - possible question answers
 *    value - question weight
 */

var QuestionSchema = new Schema({
  question: String
, answer: String
, choices: [ { text: String, order: Number } ]
, value: Number
});

QuestionSchema.virtual('json').get(function(){
  return JSON.stringify(this);
});

db.model('Question', QuestionSchema);

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
, questions: [ QuestionSchema ]
, owner: ObjectId
, format: String
});

db.model('Quiz', QuizSchema);

/**
 * Answer Schema
 *
 *    answer - selected answer
 *    correct - true | false
 *    person - who answered?
 */

var AnswerSchema = new Schema({
  answer: ObjectId
, correct: Boolean
, person: ObjectId
});

db.model('Answer', AnswerSchema);

