var fs = require('fs')
,   express = require('express')
,   app = module.exports = express();

app.use(express.static(__dirname + '/../public'));

app.enable('verbose errors');;

fs.readdirSync(__dirname + '/controllers').forEach(function (name)
{
    if (name !== 'error')
        app.use(require('./controllers/' + name));
});

app.use(require('./controllers/error'));

app.listen(process.env.PORT || 9000);