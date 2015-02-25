;(function (controller, request)
{
  'use strict';

  var app = module.exports = controller(__dirname)

      // http://bicente.itsu.com.uy/bicentenario.php?tipo=categorias
    ,	categories = [
        {id: 1, label: 'Adultos Mayores'}
      ,	{id: 5, label: 'Medio Ambiente'}
      ,	{id: 7, label: 'Salud'}
      ,	{id: 10, label: 'Trabajo'}
      ,	{id: 11, label: 'Desarrollo Social'}
      ,	{id: 12, label: 'Discapacidad'}
      ,	{id: 13, label: 'Educación y Cultura'}
      ,	{id: 14, label: 'Igualdad'}
      ,	{id: 16, label: 'Niñez y Adolescencia'}
      ,	{id: 18, label: 'Salud Sexual y Reproductiva'}
      ,	{id: 19, label: 'Seguridad'}
      ]

    ,	parseQuery = function parseQuery (query)
      {
        return {
          tipo: 'listado'
        ,	cantidad: 10
        ,	pagina: query.pagina || 1
        ,	categorias: query.categoria
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
        , articles: law.articulos
        ,	year: date.getFullYear()
        ,	fecha: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
        };
      }

    ,	parseResutls = function parseResutls (req, laws)
      {
        var query = req.query;

        if (!Array.isArray(laws.leyes))
          laws = [];

        return {
          title: 'Conocé las leyes'
        ,	path: req.path
        ,	leyes: laws.map(parseLaw)
        ,	categorias: categories
        , selected: {
            category: query.categoria
          , order: query.orden
          }
        };
      };

  app.get('/conoce-las-leyes', function (req, res)
  {
    fetchLaws(parseQuery(req.query), function (result)
    {
      if (result.ok)
        res.render('lawList', parseResutls(req, result.body));
    });
  });

}(require(__dirname + '/../../lib/controller.js'), require('superagent')));
