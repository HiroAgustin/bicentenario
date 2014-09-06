var controller = require(__dirname + '/../../lib/controller.js')

	,	app = module.exports = controller(__dirname)

	,	request = require('superagent')

	,	_ = require('underscore')

		// http://bicente.itsu.com.uy/bicentenario.php?tipo=categorias
	,	categories = {
			1: 'Adultos Mayores'
		,	5: 'Maternidad'
		,	7: 'Salud'
		,	10: 'Trabajo'
		,	11: 'Tributos'
		,	12: 'Discapacidad'
		,	13: 'Educación'
		,	14: 'Estado Civil'
		,	16: 'Niñez y Adolescencia'
		,	18: 'Salud Sexual'
		,	19: 'Seguridad'
		}

	,	parseQuery = function parseQuery (query)
		{
			var sexo = query.sexo
				,	estado = query['estado-civil'];

			return {
				tipo: 'leyes'
			,	sexo: sexo.toUpperCase()
			,	edad: query.edad || 0
			,	civil: estado
			,	uruguay: query.residencia === 'extranjero' ? 1 : 0
			,	discapacidad: query.discapacidad ? 1 : 0
			,	racial: query['identidad-racial'] ? 1 : 0
			,	hijos: query.hijos ? 1 : 0
			,	sexo: query['identidad-racial'] ? 1 : 0
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
			var date = new Date(law.fecha);

			return {
				id: law.id
			,	fecha: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
			,	category: law.categoria
			,	priority: law.prioridad
			,	description: law.nombre
			,	year: date.getFullYear()
			};
		}

	,	parseCategory = function parseCategory (leyes, id)
		{
			return {
				id: id
			,	title: categories[id]
			,	leyes: leyes
			};
		}

	,	getComparten = function getComparten (sexo, edad)
		{
			return 1;
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
			,	sexo: (query.sexo || '').toLowerCase()
			,	leyes: leyes
			,	comparten: getComparten(query.sexo, query.edad)
			,	fechas: fechas
			,	categorias: _.map(_.groupBy(leyes, 'category'), parseCategory)
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
