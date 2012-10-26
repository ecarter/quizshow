/**
 * Module Dependencies
 */

var app = require('../app')
  , db = app.db
  //, avatars = require('../support/avatars')
  , User = db.model('Person');

/**
 * Renders register view
 */

exports.join = function(req, res){
  res.render('register', {
    title: 'Join'
  //, avatars: avatars
  });
};

/**
 * Handlers registration POST
 */

exports.register = function(req, res){

  // Create user instance
  var user = new User({
    name: req.body.name
  , secret: req.body.secret
  });

  // Save user
  user.save( function (err) {
    if (err) {
      res.locals.error = err;
      return res.render('register', {
        title: 'Error - Join'
      //, avatars: avatars
      });
    }
    // Login user in
    req.session.user_id = user._id;
    res.redirect('/');
  });
};

/**
 * Renders login view
 */

exports.login = function(req, res){
  res.render('login', { title: 'Login' });
};

/**
 * Authenticates user
 */

exports.authLogin = function(req, res) {
  var query = { name: req.body.name, secret: req.body.secret };

  User.findOne(query, function (err, user) {
    if ( user && user.secret === req.body.secret ) {
      req.session.user_id = user._id;
      res.redirect('/');
    }
    res.locals.title = 'Error - Login';
    res.locals.error = 'Incorrect name or secret';
    res.render('login');
  });

};

/**
 * Deletes user session
 */

exports.logout = function(req, res) {
  delete req.session.user_id;
  return res.redirect('/');
};


/**
 * Adds `currentUser` to response locals and `user` to request
 */

exports.session = function (req, res, next) {
  var query = { _id: req.session.user_id };

  // Check session
  if ( !req.session.user_id ) return next();

  // Find user
  User.findOne(query, function (err, user) {
    if ( !user ) return next();
    // Set response locals and request user
    res.locals.currentUser = req.user = user;
    next();
  });

}; 

/**
 * Checks for authorized user and redirects user to login
 */

exports.auth = function (req, res, next) {
  var query = { _id: req.session.user_id };

  // Check session
  if ( !req.session.user_id ) return res.redirect('/login');

  // Find user
  User.findOne(query, function (err, user) {
    if ( !user ) return redirect(req, res, next);
    // Set response locals and request user
    res.locals.currentUser = req.user = user;
    next();
  });

};
