/**
 * Module Dependencies
 */

var mongoose = require('mongoose')
  , db = mongoose.createConnection('localhost', 'quizshow-test')
  , models = require('../models')
  , Person = db.model('Person');

var test_user = {
  name: 'Test User'
, secret: 'abcd1234'
, about: 'I am a test user!'
, image: '/images/avatar-default.png'
};

beforeEach(function(done){
  Person.find().remove(function(err){
    if (err) return done(err);
    done();
  });
});

describe('Person', function(){
  it('should create user', function(done){
    var person = new Person(test_user);
    person.save(function(err){
      if (err) return done(err);
      person._id.toString().should.have.length(24);
      person.name.should.equal(test_user.name);
      person.secret.should.equal(test_user.secret);
      person.about.should.equal(test_user.about);
      person.image.should.equal(test_user.image);
      done();
    });
  });
});

