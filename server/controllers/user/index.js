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

	,	comparten = {
			m: {
				nino: '312.263'
			,	adolescente: '162.013'
			,	joven: '257.092'
			,	adulto: '592.015'
			,	mayor: '254.033'
			}
		,	f: {
				nino: '298.183'
			,	adolescente: '155.835'
			,	joven: '260.661'
			,	adulto: '633.314'
			,	mayor: '360.468'
			}
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
			,	title: law.nombre
			,	category: law.categoria
			,	priority: law.prioridad
			, articles: [law.art1[0]]
			,	year: date.getFullYear()
			,	fecha: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
			};
		}

	,	getComparten = function getComparten (sex, age)
		{
			var group = '';

			if (age <= 12)
				group = 'nino';
			else if (age <= 18)
				group = 'adolescente';
			else if (age <= 29)
				group = 'joven';
			else if (age <= 59)
				group = 'adulto';
			else
				group = 'mayor';

			return comparten[sex][group];
		}

	,	parseCategory = function parseCategory (leyes, id)
		{
			return {
				id: id
			,	title: categories[id]
			,	leyes: leyes
			};
		}

	,	getCategorySize = function getCategorySize (low, high, length)
		{
			return length <= low ? 'small' : length > high ? 'large' : 'medium';
		}

	,	getCategories = function getCategories (laws)
		{
			var categories = _.map(_.groupBy(laws, 'category'), parseCategory)

				,	avg = _.reduce(categories, function (memo, category)
					{
						return memo + category.leyes.length
					}, 0) / categories.length

				,	low = avg - avg / 2

				,	high = avg + avg / 2;

			categories.forEach(function (category)
			{
				category.size = getCategorySize(low, high, category.leyes.length)
			});

			return categories;
		}

	,	parseResutls = function parseResutls (req, laws)
		{
			var query = req.query

				// ,	leyes = laws.map(parseLaw)
				,	leyes = require('./mock.json')

				,	byYear = _.groupBy(leyes, 'year')

				,	max = _.max(byYear, _.size).length

				,	fechas = _.map(byYear, function (leyes, year)
					{
						return {
							percentage: leyes.length * 90 / max
						,	year: year
						,	quantity: leyes.length
						};
					})

				,	categories = _.shuffle(getCategories(leyes));

			return {
				title: 'Mi legado de Bicentenario'
			,	path: req.path
			,	leyes: leyes
			,	fechas: fechas
			,	nombre: query.nombre
			,	personaje: {
					cabeza: query.cabeza
				,	cuerpo: query.cuerpo
				,	piernas: query.piernas
				}
			,	categorias: categories
			,	comparten: getComparten(query.sexo, query.edad)
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
