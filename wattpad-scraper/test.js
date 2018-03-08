var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

// download('http://getwallpapers.com/wallpaper/full/e/6/0/61316.jpg', 'google.jpg', function(){
//   console.log('done');
// });

console.log(Math.floor(new Date()/1000));