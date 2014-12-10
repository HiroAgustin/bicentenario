;(function (fs)
{
	'use strict';

	var controller = require(__dirname + '/../../lib/controller.js')

		,	charactersPath = __dirname + '/../../characters/'

		,	app = module.exports = controller(__dirname)

		,	getAge = function getAge (dateString)
			{
				var today = new Date()
					,	birthDate = new Date(dateString)
					,	years = today.getFullYear() - birthDate.getFullYear()
					,	month = today.getMonth() - birthDate.getMonth();

				if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate()))
					years--;

				return years;
			}

		,	getAttr = function getAttribute (user, attribute)
			{
				return user && user._json && user._json[attribute] || '';
			}

		,	parseUser = function parseUser (user)
			{
				return {
					name: getAttr(user, 'first_name')
				,	gender: getAttr(user, 'gender')
				,	age: getAge(getAttr(user, 'birthday'))
				,	status: getAttr(user, 'relationship_status')
				,	location: getAttr(user, 'location').name
				};
			}

		,	bodyParts = {};

	fs.readdirSync(charactersPath).forEach(function (item)
	{
		bodyParts[item] = fs.readdirSync(charactersPath + item);
	});

	app.get('/ingresar', function (req, res)
	{
		res.render('form', {
			title: 'Ingresar mi informacón'
		,	user: parseUser(req.user)
		,	bodyParts: bodyParts
		});
	});

}(require('fs')));
