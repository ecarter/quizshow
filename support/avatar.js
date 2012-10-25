/**
 * Module Dependecies
 */

var fs = require('fs')
  , path = require('path');

var temp = [];

fs.readdir(path.join(__dirname,'../public/images/avatars'), function(err,files){
  if (err) throw err;
  files.forEach(function(file){
    var ext = path.extname(file)
      , url = '/images/avatars/' + file;
    if ( ext === '.gif' || ext === '.jpg' || ext === '.png' ) {
      temp.push({ name: path.basename(file, ext), url: url });
    }
  });
  fs.writeFile(path.join(__dirname, 'avatars.json'), JSON.stringify(temp, null, 2), function(err){
    if (err) throw err;
    console.log('avatars saved to: avatars.json');
  });
});
