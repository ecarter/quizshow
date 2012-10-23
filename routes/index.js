/**
 * Module Dependecies
 */

var db = require('../app').db;

/*
 * GET home page.
 */

exports.index = function(req, res){
  db.model('Quiz').find({}, function(err, quizzes){
    if (err) throw err;
    res.render('index', { title: 'QuizShow', quizzes: quizzes });
  });
};
