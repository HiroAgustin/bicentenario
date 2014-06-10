var controller = require(__dirname + '/../../lib/controller.js')
,   app = module.exports = controller(__dirname);

app.get('/', function (req, res)
{
    res.render('home');
});

app.get('/ingresar', function (req, res)
{
    res.render('form', {
        title: 'Ingresar mi informacón'
    });
});

app.get('/timeline', function (req, res)
{
    res.render('timeline', {
        title: 'Timeline'
    });
});