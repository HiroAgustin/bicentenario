(function (win, doc, undefined)
{
	var background = null

	,	$ = function $ (selector)
		{
			return doc.querySelectorAll(selector);
		};

	Array.prototype.forEach.call($('[data-toggle="collapse"]'), function (button)
	{
		button.addEventListener('click', function (event)
		{
			event.preventDefault();

			$(this.getAttribute('href'))[0].classList.toggle('collapsed');
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