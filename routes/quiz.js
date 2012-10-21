
/**
 * Module dependencies.
 */

var db = require('mongoose');


/*
 * GET quiz.
 */

exports.index = function(req, res){
  db.model('Quiz').find(req.params.id, function(err, quiz){
    res.render('quiz', { title: quiz.name, quiz: quiz });
  });
};

