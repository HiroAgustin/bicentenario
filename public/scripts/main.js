(function (win, doc, undefined)
{
	'use strict';

	var lawList = _.$('#js-law-list')[0]

		,	body = _.$('#js-category-page')[0]

		,	background = null;

	_.on('click', '[data-toggle]', function (event)
	{
		var className = this.dataset.toggle;

		event.preventDefault();

		_.forEach(_.$(this.getAttribute('href')), function (element)
		{
			element.classList.toggle(className);
		});
	});

	_.listen('.js-category-item', {

		mouseover: function (event)
		{
			background && background.stop();
			body.classList.add('category-body-' + _.getTargetId(event.target));
		}

	,	mouseout: function (event)
		{
			body.classList.remove('category-body-' + _.getTargetId(event.target));
			background && background.start();
		}

	,	click: function (event)
		{
			lawList.classList.toggle('slide-left');

			_.forEach(_.$('.js-category-page:not(.hidden)', lawList), function (element)
			{
				element.classList.add('hidden');
			});

			_.$('.js-category-page[data-id="' + _.getTargetId(event.target) + '"]', lawList)[0].classList.remove('hidden');
		}
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
