(function (win, doc, undefined)
{
	'use strict';

	var $ = function $ (selector)
			{
				return doc.querySelectorAll(selector);
			}

		,	forEach = function forEach (collection, callback)
			{
				return Array.prototype.forEach.call(collection, callback);
			}

		,	listen = function listen (selector, event, callback)
			{
				return forEach($(selector), function (element)
				{
					element.addEventListener(event, callback);
				});
			}

		,	background = null;

	listen('[data-toggle]', 'click', function (event)
	{
		var className = this.dataset.toggle;

		event.preventDefault();

		forEach($(this.getAttribute('href')), function (element)
		{
			element.classList.toggle(className);
		});
	});

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
