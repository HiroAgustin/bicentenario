(function (win, doc, undefined)
{
    var $ = function $ (selector) {
            return doc.getElementById(selector)
        }
    ,   meny = null
    ,   background = null
    ,   latch = $('js-meny-indicator');

    latch && latch.addEventListener('click', function ()
    {
        meny && (meny.isOpen() ? meny.close() : meny.open());
    });

    win.addEventListener('resize', function ()
    {
        background && background.resize();
    });

    win.addEventListener('load', function ()
    {
        meny = Meny.create({
            menuElement: $('js-meny-header')
        ,   contentsElement: $('js-meny-body')
        ,   position: 'top'
        ,   height: 50
        ,   touch: false
        ,   mouse: false
        });

        background = new confetti.Context('js-confetti-background');
        background.start();

    });

    // http://css-tricks.com/snippets/css/remove-gray-highlight-when-tapping-links-in-mobile-safari/
    doc.addEventListener('touchstart', function(){}, true);

}(window, document))