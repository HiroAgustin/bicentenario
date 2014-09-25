var controller = require(__dirname + '/../../lib/controller.js')

  ,	app = module.exports = controller(__dirname)

  ,	request = require('superagent')

    // http://bicente.itsu.com.uy/bicentenario.php?tipo=categorias
  ,	categories = [
    	{id: 1, label: 'Adultos Mayores'}
    ,	{id: 5, label: 'Maternidad'}
    ,	{id: 7, label: 'Salud'}
    ,	{id: 10, label: 'Trabajo'}
    ,	{id: 11, label: 'Tributos'}
    ,	{id: 12, label: 'Discapacidad'}
    ,	{id: 13, label: 'Educación'}
    ,	{id: 14, label: 'Estado Civil'}
    ,	{id: 16, label: 'Niñez y Adolescencia'}
    ,	{id: 18, label: 'Salud Sexual'}
    ,	{id: 19, label: 'Seguridad'}
    ]

  ,	parseQuery = function parseQuery (query)
    {
      return {
        tipo: 'listado'
      ,	cantidad: 10
      ,	pagina: query.pagina || 1
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
      , articles: [law.art1[0], law.art2[0]]
      ,	year: date.getFullYear()
      ,	fecha: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
      };
    }

  ,	parseResutls = function parseResutls (req, laws)
    {
      return {
        title: 'Conocé las leyes'
      ,	leyes: laws.map(parseLaw)
      ,	categorias: categories
      ,	url: encodeURIComponent('http://bicentenario.herokuapp.com' + req.url)
      };
    };

app.get('/conoce-las-leyes', function (req, res)
{
  fetchLaws(parseQuery(req.query), function (result)
  {
    if (result.ok)
      res.render('laws', parseResutls(req, result.body));
  });
});
