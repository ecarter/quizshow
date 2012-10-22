/**
 * Module Dependencies
 */

var mongoose = require('mongoose')
  , db = mongoose.createConnection('localhost', 'quizshow-test')
  , models = require('../models')
  , Quiz = db.model('Quiz');

var test_quiz = {
  name: 'Test Quiz'
, body: 'This is a test quiz...'
, format: 'manual'
};

beforeEach(function(done){
  Quiz.find().remove(function(err){
    if (err) return done(err);
    done();
  });
});

describe('Quiz', function(){
  it('should create quiz', function(done){
    var quiz = new Quiz(test_quiz);
    quiz.save(function(err){
      if (err) return done(err);
      quiz._id.toString().should.have.length(24);
      quiz.name.should.equal(test_quiz.name);
      quiz.body.should.equal(test_quiz.body);
      quiz.format.should.equal(test_quiz.format);
      done();
    });
  });
});

