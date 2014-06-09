module.exports = function (grunt)
{
    // Load all Grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        clean: ['.sass-cache', 'public/styles']
    ,   compass: {
            main: {
                options: {
                    sassDir: 'public/scss'
                ,   cssDir: 'public/styles'
                ,   importPath: [
                        'public/bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/'
                    ]
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
                files: ['public/scss/**/*.scss', 'public/scripts/*.js', 'server/**/*.ejs']
            ,   tasks: ['compass']
            ,   options: {
                    livereload: true
                }
            }
        }
    ,   copy: {
            main: {
                files: [
                    // Fontawesome
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
                    ,   src: []
                    ,   dest: 'public/scripts/'
                    }
                    // Bootstrap Libs
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

    grunt.registerTask('serve', [
        'build'
    ,   'express'
    ,   'watch'
    ]);

    grunt.registerTask('default', [
        'serve'
    ]);
};