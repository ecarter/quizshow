/**
 * Module Dependecies
 */

var fs = require('fs')
  , path = require('path')
  , config = require('../config')
  , mongoose = require('mongoose')
  , db = mongoose.createConnection(config.MONGO_HOST, config.MONGO_DB)
  , models = require('../models')
  , questions = require('./questions');

var temp = {}
  , quizzes = []
  , Quiz = db.model('Quiz')
  , Question = db.model('Question')
  , min = 50; // minimum question count for import

/**
 * Build Categories
 */

questions.forEach(function(question){
  var category = question.category;

  if ( !temp[category] ) {
    temp[category] = {};
  }

  delete question.category;
  if ( !temp[category].questions ) {
    temp[category].questions = [];
  }

  temp[category].questions.push(question);
});

/**
 * Build Import
 */

for (var key in temp) {
  var category = temp[key]
    , quiz = {};

  quiz.category = key;
  quiz.questions = category.questions;
  quizzes.push(quiz);
  if ( quiz.questions.length > min ) {
    importQuiz(quiz);
  }
}

/**
 * Import Quiz data
 *
 * @param Object data quiz object
 */

function importQuiz (data) {
  var quiz = new Quiz({ name: key, format: 'manual' })
    , total = category.questions.length
    , count = 0;

  function next() {
    if ( count === total ) {
      quiz.save(function(err){
        if (err) throw err;
        console.log('quiz saved:', quiz.name);
      });
    }
  }

  data.questions.forEach(function(q){
    var question = new Question(q);
    question.save(function(err){
      if (err) throw err;
      quiz.questions.push(question);
      console.log('count',count,'total',total)
      ++count;
      next();
    });
  });

}

//console.log('quizzes',quizzes);

//process.exit();
