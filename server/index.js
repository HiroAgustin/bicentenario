var express = require('express')
	app = module.exports = express();

app.use(express.static(__dirname + '/../public'), {
	maxAge: 604800000
});

app.enable('verbose errors');

app.use(require('./controllers/landing'));
app.use(require('./controllers/facebook'));

app.use(require('./controllers/form'));
app.use(require('./controllers/user'));
app.use(require('./controllers/laws'));

app.use(require('./controllers/error'));

app.listen(process.env.PORT || 9000);
