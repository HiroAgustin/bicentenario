module.exports = function (dirname)
{
    var express = require('express')
    ,   engine = require('ejs-locals')
    ,   app = express();

    // configure Express
    app.configure(function ()
    {
        app.set('views', dirname + '/views');
        app.set('view engine', 'ejs');
        app.engine('ejs', engine);

        app.use(express.logger());
        app.use(express.compress());

        app.use(express.json());
        app.use(express.urlencoded());

        app.use(express.cookieParser());
        app.use(express.session({
            secret: 'Apples are red'
        }));
    });

    return app;
};