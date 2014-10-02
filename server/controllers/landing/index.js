var controller = require(__dirname + '/../../lib/controller.js')
,	app = module.exports = controller(__dirname)

app.get('/', function (req, res)
{
	res.render('home', {
		path: req.path
	});
});

app.get('/linea-de-tiempo', function (req, res)
{
	res.render('timeline', {
		title: 'Linea de tiempo'
	,	path: req.path
	});
});

app.get('/que-es-este-proyecto', function (req, res)
{
	res.render('info', {
		title: '¿Qué es este proyecto?'
	,	path: req.path
	});
});
