var controller = require(__dirname + '/../../lib/controller.js')
,   app = module.exports = controller(__dirname);

// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.
app.use(function (req, res, next)
{
    res.status(404);

    // respond with html page
    if (req.accepts('html'))
    {
        res.render('404', { url: req.url });
        return;
    }

    // respond with json
    if (req.accepts('json'))
    {
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});

app.use(function (err, req, res, next)
{
  // we may use properties of the error object
  // here and next(err) appropriately, or if
  // we possibly recovered from the error, simply next().
  res.status(err.status || 500);
  res.render('500', { error: err });
});

app.get('/404', function (req, res, next)
{
    // trigger a 404 since no other middleware
    // will match /404 after this one, and we're not
    // responding here
    next();
});

app.get('/403', function (req, res, next)
{
  // trigger a 403 error
  var err = new Error('not allowed!');
  err.status = 403;
  next(err);
});

app.get('/500', function (req, res, next)
{
  // trigger a generic (500) error
  next(new Error('keyboard cat!'));
});