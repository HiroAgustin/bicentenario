var controller = require(__dirname + '/../../lib/controller.js')
,   app = module.exports = controller(__dirname)
,   _ = require('underscore');

app.get('/mis-leyes', function (req, res)
{
    var api = {
        nombre: 'María Jose'
    ,   leyes: [
            {
                title: 'Salud Sexual y Reproductiva'
            ,   icon: ''
            ,   color: '#C31425'
            ,   description: ''
            ,   url: '#'
            ,   year: 2010
            }
        ,   {
                title: 'Maternidad'
            ,   icon: ''
            ,   color: '#13C394'
            ,   description: ''
            ,   url: '#'
            ,   year: 2010
            }
        ,   {
                title: 'Empleo'
            ,   icon: ''
            ,   color: '#D461C0'
            ,   description: ''
            ,   url: '#'
            ,   year: 2013
            }
        ]
    ,   comparten: 50000
    };

    api.title = 'Leyes de ' + api.nombre;

    var agrupados = _.groupBy(api.leyes, 'year')
    ,   max = _.max(agrupados, _.size).length;

    api.fechas = _.map(agrupados, function (leyes, year)
    {
        return {
            // that 90 should be 100, style thing
            percentage: leyes.length * 90 / max
        ,   year: year
        ,   quantity: leyes.length
        };
    });

    res.render('user', api);
});