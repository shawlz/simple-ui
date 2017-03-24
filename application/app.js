var gzippo = require('gzippo');
var express = require('express');
var logger = require('morgan');
var app = express();
var fs = require('fs');
var text = "var settings = {};\n"
text = text + "settings.api = {};\n";
text = text + "settings.api.baseURL = '" + process.env.BASE_URL_API + "';\n";
fs.writeFile('./dev/assets/js/settings.js', text, function(err) {
    if (err) {
        return console.log(err);
    }
});
app.use(logger('dev'));
app.use(gzippo.staticGzip(__dirname + "/dev"));
app.listen(process.env.PORT || 5000);
