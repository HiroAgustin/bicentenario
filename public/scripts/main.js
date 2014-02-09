(function (win, doc, undefined)
{
    var meny = null
    ,   background = null
    ,   latch = doc.getElementById('js-meny-indicator');

    latch.addEventListener('click', function ()
    {
        meny && meny.open();
    });

    win.addEventListener('resize', function ()
    {
        background && background.resize();
    });

    win.addEventListener('load', function ()
    {
        // meny = Meny.create({
        //     menuElement: doc.getElementById('js-meny-header')
        // ,   contentsElement: doc.getElementById('js-meny-body')
        // ,   position: 'top'
        // ,   height: 62
        // });

        background = new confetti.Context('js-confetti-background');
        background.start();

    });

}(window, document))