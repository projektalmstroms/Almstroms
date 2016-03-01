var fs = require('fs');

function readJson(file, callback){
   var data;
   fs.readFile(file, 'utf8', function (err, text) {
      if (err) throw err;
      data = JSON.parse(text);
      callback(data);
   });
}

module.exports.readJson = readJson;
