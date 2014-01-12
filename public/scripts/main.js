(function (win, doc, undefined)
{
    var meny = null
    ,   latch = doc.querySelector('.js-meny-indicator');

    latch.addEventListener('click', function ()
    {
        meny && meny.open();
    });

    win.addEventListener('load', function ()
    {
        meny = Meny.create({
            menuElement: doc.querySelector('.js-meny-header')
        ,   contentsElement: doc.querySelector('.js-meny-body')
        ,   position: 'top'
        ,   height: 62
        });
    }, false);

}(window, document))