/**
 * Module Dependencies
 */

var mongoose = require('mongoose')
  , db = mongoose.createConnection('localhost', 'quizshow-test')
  , models = require('../models')
  , Quiz = db.model('Quiz')
  , Question = db.model('Question')
  , Answer = db.model('Answer')
  , test = require('./fixtures');

beforeEach(function(done){
  var count = 3
    , total = 0;
  function next(err) {
    if (err) return done(err);
    ++total;
    if (count === total) done();
  }
  Quiz.find().remove(next);
  Question.find().remove(next);
  Answer.find().remove(next);
});

describe('Quiz', function(){
  it('should create quiz', function(done){
    var quiz = new Quiz(test.quiz);

    var answer1 = new Answer(test.answer1);
    answer1.save(function(err){
      if (err) return done(err);
    });

    var answer2 = new Answer(test.answer2);
    answer2.save(function(err){
      if (err) return done(err);
    });

    var answer3 = new Answer(test.answer3);
    answer3.save(function(err){
      if (err) return done(err);
    });

    var question1 = new Question(test.question1);
    question1.answers.push({ answer: answer1, order: 1 });
    question1.answers.push({ answer: answer2, order: 2 });
    question1.answers.push({ answer: answer3, order: 3 });
    question1.save(function(err){
      if (err) return done(err);
    });

    var question2 = new Question(test.question2);
    question2.answers.push({ answer: answer1, order: 1 });
    question2.answers.push({ answer: answer2, order: 2 });
    question2.answers.push({ answer: answer3, order: 3 });
    question2.save(function(err){
      if (err) return done(err);
    });

    var question3 = new Question(test.question3);
    question3.answers.push({ answer: answer1, order: 1 });
    question3.answers.push({ answer: answer2, order: 2 });
    question3.answers.push({ answer: answer3, order: 3 });
    question3.save(function(err){
      if (err) return done(err);
    });

    quiz.questions.push(question1);
    quiz.questions.push(question2);
    quiz.questions.push(question3);

    quiz.save(function(err){
      if (err) return done(err);
      quiz._id.toString().should.have.length(24);
      quiz.name.should.equal(test.quiz.name);
      quiz.body.should.equal(test.quiz.body);
      quiz.questions.should.have.length(3);
      quiz.questions[0]._id.should.equal(question1._id);
      quiz.questions[1]._id.should.equal(question2._id);
      quiz.questions[2]._id.should.equal(question3._id);
      quiz.format.should.equal(test.quiz.format);
      done();
    });
  });
});

