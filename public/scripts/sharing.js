(function (win, doc, s, fb, tw, ggl)
{
    var js, fjs = doc.getElementsByTagName(s)[0];

    // https://developers.facebook.com/docs/javascript/quickstart/v2.0#loading
    win.fbAsyncInit = function ()
    {
        FB.init({
            appId: '144441392317207'
        ,   xfbml: true
        ,   version: 'v2.0'
        });
    };

    // <!-- Facebook Share Button -->
    js = doc.createElement(s);
    js.id = fb;
    js.src = '//connect.facebook.net/es_LA/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
    // <!-- End Facebook Share Button -->

    // <!-- Twitter Button -->
    js = doc.createElement(s);
    js.id = tw;
    js.src = '//platform.twitter.com/widgets.js';
    fjs.parentNode.insertBefore(js,fjs);
    // <!-- End Twitter Button -->

    // <!-- Google Analytics -->
    win['GoogleAnalyticsObject'] = 'ga';

    win.ga = function ()
    {
        (win.ga.q = win.ga.q || []).push(arguments);
    };

    win.ga.l = 1 * new Date();
        
    js.async = 1;
    js.src = ggl;
    fjs.parentNode.insertBefore(js, fjs)

    ga('create', 'UA-XXXX-Y', 'auto');
    ga('send', 'pageview');
    // <!-- End Google Analytics -->

}(window, document, 'script', 'facebook-jssdk', 'twitter-wjs', '//www.google-analytics.com/analytics.js'))