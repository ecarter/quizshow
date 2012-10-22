/**
 * Module Dependencies
 */

var mongoose = require('mongoose')
  , db = mongoose.createConnection('localhost', 'quizshow-test')
  , models = require('../models')
  , Person = db.model('Person')
  , test_user = require('./fixtures').user;

before(function(done){
  Person.collection.drop();
  done();
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

