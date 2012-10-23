
/**
 * Module dependencies.
 */

var db = require('../app').db;


/*
 * GET quiz.
 */

exports.index = function(req, res){
  console.log('req.params.id',req.params.id);
  db.model('Quiz').findById(req.params.id, function(err, quiz){
    console.log('quiz',quiz);
    if (err) throw err;
    res.render('quiz', { title: quiz.name, quiz: quiz });
  });
};

