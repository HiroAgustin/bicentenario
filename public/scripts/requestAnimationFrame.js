// requestAnimationFrame polyfill
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
(function (win)
{
  var x = 0
    , lastTime = 0
    , vendors = ['webkit', 'moz']
    , vendorsLength = vendors.length;

  for (x = 0; x < vendorsLength && !win.requestAnimationFrame; ++x)
  {
    win.requestAnimationFrame = win[vendors[x] + 'RequestAnimationFrame'];
    win.cancelAnimationFrame = win[vendors[x] + 'CancelAnimationFrame'] || win[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!win.requestAnimationFrame)
    win.requestAnimationFrame = function (callback, element)
    {
      var currTime = new Date().getTime()
        , timeToCall = Math.max(0, 16 - (currTime - lastTime))
        , id = win.setTimeout(
            function ()
            {
              callback(currTime + timeToCall);
            }
          , timeToCall
          );

      lastTime = currTime + timeToCall;

      return id;
    };

  if (!win.cancelAnimationFrame)
    win.cancelAnimationFrame = function (id)
    {
      clearTimeout(id);
    };

}(window));
