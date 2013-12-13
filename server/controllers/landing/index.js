var controller = require(__dirname + '/../../lib/controller.js')
,   app = module.exports = controller(__dirname);

app.get('/', function (req, res)
{
    res.render('home', {
        title: 'Bicentenario'
    });
});