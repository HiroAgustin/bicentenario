(function (win, doc, s, js, fjs, inc)
{
  fjs = doc.getElementsByTagName(s)[0];

  inc = function (src)
  {
    js = doc.createElement(s);
    js.src = src;
    js.async = 1;
    fjs.parentNode.insertBefore(js, fjs);
  };

  // https://developers.facebook.com/docs/javascript/quickstart/v2.0#loading
  win.fbAsyncInit = function ()
  {
    FB.init({
      appId: '144441392317207'
    , xfbml: true
    , version: 'v2.0'
    });
  };

  _.on('[data-share="facebook"]', 'click', function (event)
  {
    event.preventDefault();

    FB.ui({
      method: 'share'
    , href: location.href
    });
  });

  // <!-- Facebook Share Button -->
  inc('//connect.facebook.net/es_LA/sdk.js');
  // <!-- End Facebook Share Button -->

  // <!-- Twitter Button -->
  inc('//platform.twitter.com/widgets.js');
  // <!-- End Twitter Button -->

  // <!-- Google Analytics -->
  inc('//www.google-analytics.com/analytics.js');

  win['GoogleAnalyticsObject'] = 'ga';

  win.ga = function ()
  {
    (win.ga.q = win.ga.q || []).push(arguments);
  };

  win.ga.l = 1 * new Date();

  ga('create', 'UA-XXXX-Y', 'auto');
  ga('send', 'pageview');
  // <!-- End Google Analytics -->

}(window, document, 'script'))
