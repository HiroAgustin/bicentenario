var express = require('express')

module.exports = function (path)
{
    var app = express();

    app.set('views', path + '/views');
    app.set('view engine', 'ejs');
    app.engine('ejs', require('ejs').renderFile);
    app.set('strict routing', true);

    return app;
};

module.exports.static = express.static;