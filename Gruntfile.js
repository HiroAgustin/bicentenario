module.exports = function (grunt)
{
    // Load all Grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        clean: ['public/styles', 'public/fonts']
    ,   compass: {
            main: {
                options: {
                    sassDir: 'public/scss'
                ,   cssDir: 'public/styles'
                ,   importPath: ['public/bower_components/sass-bootstrap/lib/']
                ,   specify: ['public/scss/main.scss']
                }
            }
        }
    ,   express: {
            serve: {
                options: {
                    script: 'server'
                ,   port: 9000
                ,   delay: 5
                }
            }
        }
    ,   watch: {
            compass: {
                files: ['public/scss/*.scss', 'public/scripts/*.js', 'server/**/*.ejs']
            ,   tasks: ['compass']
            ,   options: {
                    livereload: true
                }
            }
        }
    ,   copy: {
            bootstrapIcons: {
                files: [{
                    expand: true
                ,   src: ['public/bower_components/sass-bootstrap/fonts/**']
                ,   dest: 'public/fonts/'
                ,   flatten: true
                ,   filter: 'isFile'
                }]
            }
        ,   fontAwesomeIcons: {
                files: [{
                    expand: true
                ,   flatten: true
                ,   filter: 'isFile'
                ,   src: ['public/bower_components/font-awesome/fonts/**']
                ,   dest: 'public/fonts/'
                }]
            }
        ,   fontAwesomeStlyes: {
                files: [{
                    expand: true
                ,   flatten: true
                ,   filter: 'isFile'
                ,   src: ['public/bower_components/font-awesome/css/font-awesome.css']
                ,   dest: 'public/styles/'
                }]
            }
        ,   jsLibs: {
                files: [{
                    expand: true
                ,   flatten: true
                ,   filter: 'isFile'
                ,   src: ['public/bower_components/meny/js/meny.js']
                ,   dest: 'public/scripts/'
                }]
            }
        }
    ,   buildcontrol: {
            options: {
                commit: true
            ,   push: true
            ,   dir: '.'
            ,   message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
            }
        ,   heroku: {
                options: {
                    remote: 'git@heroku.com:bicentenario.git'
                ,   branch: 'master'
                }
            }
        }
    });

    grunt.registerTask('build', [
        'clean'
    ,   'compass'
    ,   'copy:fontAwesomeIcons'
    ,   'copy:fontAwesomeStlyes'
    ,   'copy:jsLibs'
    ]);

    grunt.registerTask('deploy', [
        'build'
    ,   'buildcontrol'
    ]);

    grunt.registerTask('server', [
        'build'
    ,   'express'
    ,   'watch'
    ]);

    grunt.registerTask('default', [
        'server'
    ]);
};