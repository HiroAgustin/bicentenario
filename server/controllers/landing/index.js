var controller = require(__dirname + '/../../lib/controller.js')
,   app = module.exports = controller(__dirname)

,   getAttr = function getAttribute (user, attribute)
    {
        return user && user._json && user._json[attribute] || '';
    }

,   parseUser = function parseUser (user)
    {
        var gender = getAttr(user, 'gender')
        ,   ageRange = getAttr(user, 'age_range');

        return {
            name: getAttr(user, 'first_name')
        ,   isMale: gender === 'male'
        ,   isFemale: gender === 'female'
        ,   isYoung: ageRange.max === 17
        ,   isAdult: ageRange.min >= 18
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