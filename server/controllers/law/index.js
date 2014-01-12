var controller = require(__dirname + '/../../lib/controller.js')
,   app = module.exports = controller(__dirname);

app.get('/user', function (req, res)
{
    res.render('user', {
        title: 'User'
    });
});