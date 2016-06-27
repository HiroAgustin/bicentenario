module.exports = function (grunt)
{
	'use strict';

	// Load all Grunt tasks
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		clean: ['.sass-cache', 'public/styles']

	,	compass: {
			main: {
				options: {
					sassDir: 'public/scss'
				,	cssDir: 'public/styles'
				,	importPath: [
						'public/bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap/'
					]
				,	outputStyle: 'compressed'
				}
			}
		}

	,	express: {
			options: {
				port: 9000
			,	delay: 5
			}

		,	dev: {
				options: {
					script: 'server'
				}
			}
		}

	,	watch: {
			compass: {
				files: ['public/scss/**/*.scss', 'public/scripts/*.js', 'server/**/*.ejs', 'server/**/*.svg']
			,	tasks: ['compass']
			,	options: {
					livereload: true
				}
			}

		,	express: {
				files: ['server/**/*.{js,json}']
			,	tasks: ['express:dev', 'wait']
			,	options: {
					livereload: true
					// Without this option specified express won't be reloaded
				,	spawn: false
				}
			}
		}

	,	svgclean: {
			options: {}
		,	dist: {
				files: [{
					expand: true
				,	cwd: 'server/characters'
				,	src: '{,*/}*.svg'
				,	dest: 'server/characters/min'
				}]
			}
		}

	,	svgmin: {
			options: {}
		,	dist: {
        files: [{
          expand: true
        ,	cwd: 'server/characters/min'
				,	src: '{,*/}*.svg'
        ,	dest: 'server/characters/min'
        }]
			}
		}

	,	copy: {
			main: {
				files: [
					// Fontawesome
					{
						expand: true
					,	flatten: true
					,	filter: 'isFile'
					,	src: ['public/bower_components/font-awesome/fonts/**']
					,	dest: 'public/fonts/'
					}
				,	{
						expand: true
					,	flatten: true
					,	filter: 'isFile'
					,	src: ['public/bower_components/font-awesome/css/font-awesome.css']
					,	dest: 'public/styles/'
					}
					// Js Libs
				,	{
						expand: true
					,	flatten: true
					,	filter: 'isFile'
					,	src: []
					,	dest: 'public/scripts/'
					}
				]
			}
		}

	,	buildcontrol: {
			options: {
				commit: true
			,	push: true
			,	force: true
      ,	connectCommits: false
			,	dir: '.'
			,	message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
			}
		,	heroku: {
				options: {
					remote: 'git@heroku.com:bicentenario.git'
				,	branch: 'master'
				}
			}
		}

	,	open: {
			server: {
				url: 'http://localhost:<%= express.options.port %>'
			}
		}
	});

	// Used for delaying livereload until after server has restarted
	grunt.registerTask('wait', function ()
	{
		grunt.log.ok('Waiting for server reload...');

		var done = this.async();

		setTimeout(function ()
		{
			grunt.log.writeln('Done waiting!');
			done();
		}, 1500);
	});

	grunt.registerTask('build', [
		'clean'
	,	'compass'
	,	'copy'
	]);

	grunt.registerTask('deploy', [
		'build'
	,	'buildcontrol'
	]);

	grunt.registerTask('serve', [
		'build'
	,	'express:dev'
	,	'wait'
	,	'open'
	,	'watch'
	]);
};
