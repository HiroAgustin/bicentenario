(function (win, doc, undefined)
{
	'use strict';

	var $ = function $ (selector, context)
			{
				return (context || doc).querySelectorAll(selector);
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

		,	getTargetId = function getTargetId(target)
			{
				return target.dataset.id || getTargetId(target.parentNode);
			}

		,	lawList = $('#js-law-list')[0]

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

	listen('.js-category-item', 'mouseover', function (event)
	{
		$('body')[0].classList.add('category-body-' + getTargetId(event.target));
	});

	listen('.js-category-item', 'mouseout', function (event)
	{
		$('body')[0].classList.remove('category-body-' + getTargetId(event.target));
	});

	listen('.js-category-item', 'click', function (event)
	{
		lawList.classList.toggle('slide-left');

		forEach($('.js-category-page:not(.hidden)', lawList), function (element)
		{
			element.classList.add('hidden');
		});

		$('.js-category-page[data-id="' + getTargetId(event.target) + '"]', lawList)[0].classList.remove('hidden');
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
