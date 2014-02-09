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
                ,   importPath: ['public/bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/']
                ,   specify: ['public/scss/main.scss']
                ,   outputStyle: 'compressed'
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
            main: {
                files: [
                    // Fontawesome Icons
                    {
                        expand: true
                    ,   flatten: true
                    ,   filter: 'isFile'
                    ,   src: ['public/bower_components/font-awesome/fonts/**']
                    ,   dest: 'public/fonts/'
                    }
                ,   {
                        expand: true
                    ,   flatten: true
                    ,   filter: 'isFile'
                    ,   src: ['public/bower_components/font-awesome/css/font-awesome.css']
                    ,   dest: 'public/styles/'
                    }
                    // Js Libs
                ,   {
                        expand: true
                    ,   flatten: true
                    ,   filter: 'isFile'
                    ,   src: ['public/bower_components/meny/js/meny.js']
                    ,   dest: 'public/scripts/'
                    }
                    // Bootstrap Scripts
                // ,   {
                //         expand: true
                //     ,   flatten: true
                //     ,   filter: 'isFile'
                //     ,   src: ['public/bower_components/bootstrap-sass/vendor/assets/javascripts/bootstrap/collapse.js']
                //     ,   dest: 'public/scripts/'
                //     }
                ]
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
    ,   'copy'
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