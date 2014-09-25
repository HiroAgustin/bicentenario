var controller = require(__dirname + '/../../lib/controller.js')
,	app = module.exports = controller(__dirname)

app.get('/', function (req, res)
{
	res.render('home', {
		path: req.path
	});
});

app.get('/timeline', function (req, res)
{
	res.render('timeline', {
		title: 'Timeline'
	,	path: req.path
	});
});

app.get('/info', function (req, res)
{
	res.render('info', {
		title: '¿Cómo van a manejar mi información?'
	,	path: req.path
	});
});
