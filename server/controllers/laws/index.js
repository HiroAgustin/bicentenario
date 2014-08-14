var controller = require(__dirname + '/../../lib/controller.js')

,	app = module.exports = controller(__dirname)

,	request = require('superagent')

,   _ = require('underscore')

,	categories = {
		0: 'Indefinido'
	,	1: 'Igualdad'
	,	2: 'Trabajo'
	}

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

,	fetchLaws = function fetchLaws (query, callback)
	{
		request
			.get('http://bicente.itsu.com.uy/bicentenario.php')
			.query(query)
			.end(callback);
	}

,	parseLaw = function parseLaw (law)
	{
		return {
			id: law.id
		,	category: law.categoria
		,	year: (new Date(law.fecha)).getFullYear()
		};
	}

,	getCategory = function getCategory (category)
	{
		return {
			id: category
		,	title: categories[category]
		};
	}

,	parseResutls = function parseResutls (req, laws)
	{
		var query = req.query

		,	leyes = _.map(laws, parseLaw)

		,	byYear = _.groupBy(leyes, 'year')

		,	max = _.max(byYear, _.size).length

		,	fechas = _.map(byYear, function (leyes, year)
			{
				return {
					percentage: leyes.length * 90 / max
				,	year: year
				,	quantity: leyes.length
				};
			});

		return {
			title: 'Mi legado de Bicentenario'
		,	nombre: query.nombre
		,	sexo: (query.sexo ||  '').toLowerCase()
		,	leyes: leyes
		,	comparten: 1
		,	fechas: fechas
		,	categorias: _.map(_.uniq(_.pluck(leyes, 'category')), getCategory)
		,	url: encodeURIComponent('http://bicentenario.herokuapp.com' + req.url)
		};
	};

app.get('/mis-leyes', function (req, res)
{
	fetchLaws(parseQuery(req.query), function (result)
	{
		if (result.ok)
			res.render('user', parseResutls(req, result.body));
	});
});