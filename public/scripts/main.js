(function (win, doc, undefined)
{
    var background = null;

    win.addEventListener('resize', function ()
    {
        background && background.resize();
    });

    win.addEventListener('load', function ()
    {
        background = new confetti.Context('js-confetti-background');
        background.start();
    });

    // http://css-tricks.com/snippets/css/remove-gray-highlight-when-tapping-links-in-mobile-safari/
    doc.addEventListener('touchstart', function(){}, true);

}(window, document))