var controller = require(__dirname + '/../../lib/controller.js')
,   app = module.exports = controller(__dirname)

,   getAttr = function getAttribute (user, attribute)
    {
        return user && user[attribute] || '';
    }

,   parseUser = function parseUser (user)
    {
        return {
            name: getAttr(user, 'displayName')
        }
    };

app.get('/', function (req, res)
{
    res.render('home');
});

app.get('/ingresar', function (req, res)
{
    res.render('form', {
        title: 'Ingresar mi informacón'
    ,   user: parseUser(req.user)
    });
});

app.get('/timeline', function (req, res)
{
    res.render('timeline', {
        title: 'Timeline'
    });
});