/**
 * Module Dependencies
 */

var avatars = require('../support/avatars');

/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.join = function(req, res){
  res.render('register', { title: 'Join', avatars: avatars });
};

exports.register = function(req, res){
  res.render('register', { title: 'Join', avatars: avatars });
};
