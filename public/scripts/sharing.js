(function (win, doc, s, js, fjs, inc, ga, UserVoice)
{
  'use strict';

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

  _.on('click', '[data-share="facebook"]', function (event)
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

  win.GoogleAnalyticsObject = 'ga';

  ga = win.ga = function ()
  {
    (win.ga.q = win.ga.q || []).push(arguments);
  };

  ga.l = 1 * new Date();

  ga('create', 'UA-34702401-8', 'auto');
  ga('send', 'pageview');
  // <!-- End Google Analytics -->

  // <!-- UserVoice -->
  inc('//widget.uservoice.com/e483fOHnPzZjIrtb0pkxDw.js');

  win.UserVoice = win.UserVoice || [];

  win.UserVoice.push(['showTab', 'classic_widget', {
    mode: 'full'
  , primary_color: '#1f2438'
  , link_color: '#006eb2'
  , default_mode: 'feedback'
  , forum_id: 233162
  , topic_id: 74722
  , tab_label: 'Comentarios y soporte'
  , tab_color: '#1f2438'
  , tab_position: 'middle-right'
  , tab_inverted: false
  }]);
  // <!-- End UserVoice -->

}(window, document, 'script'));
