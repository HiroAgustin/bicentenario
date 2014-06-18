var express = require('express')
,   app = module.exports = express();

app.use(express.static(__dirname + '/../public'), {
    // One week in miliseconds
    maxAge: 604800000
});

app.enable('verbose errors');

app.use(require('./controllers/facebook'));
app.use(require('./controllers/landing'));
app.use(require('./controllers/law'));
app.use(require('./controllers/error'));

app.listen(process.env.PORT || 9000);