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

before(function(done){
  Quiz.collection.drop();
  Question.collection.drop();
  Answer.collection.drop();
  done();
});

describe('Quiz', function(){

  var answer1, answer2, answer3, question1, question2, question3;

  it('should create questions', function(done){
    var count = 0;
    function next(){
      if (count === 3) done();
    }

    question1 = new Question(test.question1);
    question1.answers.push({ answer: answer1, order: 1 });
    question1.answers.push({ answer: answer2, order: 2 });
    question1.answers.push({ answer: answer3, order: 3 });
    question1.save(function(err){
      if (err) return done(err);
      count++;
      next();
    });

    question2 = new Question(test.question2);
    question2.answers.push({ answer: answer1, order: 1 });
    question2.answers.push({ answer: answer2, order: 2 });
    question2.answers.push({ answer: answer3, order: 3 });
    question2.save(function(err){
      if (err) return done(err);
      count++;
      next();
    });

    question3 = new Question(test.question3);
    question3.answers.push({ answer: answer1, order: 1 });
    question3.answers.push({ answer: answer2, order: 2 });
    question3.answers.push({ answer: answer3, order: 3 });
    question3.save(function(err){
      if (err) return done(err);
      count++;
      next();
    });
  });

  it('should create answers', function(done){
    var count = 0;
    function next(){
      if (count === 3) done();
    }

    answer1 = new Answer(test.answer1);
    answer1.save(function(err){
      if (err) return done(err);
      count++;
      next();
    });

    answer2 = new Answer(test.answer2);
    answer2.save(function(err){
      if (err) return done(err);
      count++;
      next();
    });

    answer3 = new Answer(test.answer3);
    answer3.save(function(err){
      if (err) return done(err);
      count++;
      next();
    });
  });

  it('should create quiz', function(done){
    var quiz = new Quiz(test.quiz);

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

