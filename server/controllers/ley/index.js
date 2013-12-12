var express = require('express')
,   app = module.exports = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.set('strict routing', true);

app.get('/leyes', function (req, res)
{
    res.render('list', {
        leyes: ['asd', 'vxc', 'erw']
    });
});