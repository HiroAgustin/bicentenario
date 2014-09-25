var controller = require(__dirname + '/../../lib/controller.js')
,	app = module.exports = controller(__dirname)

app.get('/', function (req, res)
{
	res.render('home');
});

app.get('/linea-de-tiempo', function (req, res)
{
	res.render('timeline', {
		title: 'Linea de tiempo'
	});
});

app.get('/que-es-este-proyecto', function (req, res)
{
	res.render('info', {
		title: '¿Qué es este proyecto?'
	});
});
