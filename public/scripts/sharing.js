(function (win, doc, s, fb, tw)
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

}(window, document, 'script', 'facebook-jssdk', 'twitter-wjs'));