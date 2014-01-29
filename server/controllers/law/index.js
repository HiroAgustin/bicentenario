var controller = require(__dirname + '/../../lib/controller.js')
,   app = module.exports = controller(__dirname);

app.get('/mis-leyes', function (req, res)
{
    var api = {
        nombre: 'Maria Jose'
    ,   leyes: [
            {
                title: 'Salud Sexual y Reproductiva'
            ,   icon: ''
            ,   description: 'A ponerla'
            ,   url: '/aaaaapo'
            ,   year: 2010
            }
        ,   {
                title: 'Maternidad'
            ,   icon: ''
            ,   description: 'Tas gorda mija'
            ,   url: '/pregos'
            ,   year: 2010
            }
        ,   {
                title: 'Empleo'
            ,   icon: ''
            ,   description: 'Si o si laburas'
            ,   url: '/moneymoney'
            ,   year: 2013
            }
        ]
    ,   comparten: 50000
    };

    api.title = 'Leyes de ' + api.nombre;

    res.render('user', api);
});