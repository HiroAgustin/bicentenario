var controller = require(__dirname + '/../../lib/controller.js')

,	app = module.exports = controller(__dirname)

,	request = require('superagent')

,	getCivil = function getCivil (estado)
	{
		switch (estado)
		{
			case 'soltero': estado = 1;
				break;
			default:
				estado = 0;
		}

		return estado;
	}

,	parseQuery = function parseQuery (query)
	{
		var sexo = query.sexo
		,	estado = query['estado-civil'];

		return {
			tipo: 'leyes'
		,	sexo: sexo === 'hombre' ? 1 : sexo === 'mujer' ? 2 : 0
		,	edad: query.edad || 0
		,	civil: getCivil(estado)
		,	uruguay: query.residencia === 'uruguay' ? 1 : 0
		,	discapacidad: query.discapacidad ? 1 : 0
		,	racial: query['identidad-racial'] ? 1 : 0
		,	hijos: query.hijos ? 1 : 0
		,	genero: query['identidad-racial'] ? 1 : 0
		};
	}

	fetchLaws = function fetchLaws (query, callback)
	{
		request
			.get('http://bicente.itsu.com.uy/bicentenario.php')
			.query(query)
			.end(callback);
	}

	parseResutls = function parseResutls (nombre, laws)
	{
		return {
			nombre: nombre
		,	leyes: []
		,	fechas: []
		,	comparten: ''
		};
	};

app.get('/mis-leyes', function (req, res)
{
	var query = req.query;

	fetchLaws(parseQuery(query), function (result)
	{
		if (result.ok)
			res.render('laws', parseResutls(query.nombre, result.body));
	});
});