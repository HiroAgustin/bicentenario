(function (win, doc, undefined)
{
  'use strict';

  win._ = {

    $: function $ (selector, context)
    {
      return (context || doc).querySelectorAll(selector);
    }

  ,	forEach: function forEach (collection, callback)
    {
      return Array.prototype.forEach.call(collection, callback);
    }

  ,	on: function on (event, selector, callback)
    {
      return _.forEach(_.$(selector), function (element)
      {
        element.addEventListener(event, callback);
      });
    }

  ,	listen: function listen (selector, events)
    {
      var evnt = '';

      for (evnt in events)
        _.on(evnt, selector, events[evnt]);
    }

  ,	getTargetId: function getTargetId(target)
    {
      return target.dataset.id || getTargetId(target.parentNode);
    }
  };

}(window, document))
