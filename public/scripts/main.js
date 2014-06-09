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

}(window, document))