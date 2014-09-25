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
			,	title: law.nombre
			,	category: law.categoria
			,	priority: law.prioridad

			// , articles: [law.art1[0]]
			,	articles: ['Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.']

			,	year: date.getFullYear()
			,	fecha: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
			};
		}

	,	getComparten = function getComparten (sex, age)
		{
			return '22.000';
		}

	,	parseCategory = function parseCategory (leyes, id)
		{
			return {
				id: id
			,	title: categories[id]
			,	leyes: leyes
			};
		}

	,	getCategorySize = function setCategorySize (low, high, length)
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
