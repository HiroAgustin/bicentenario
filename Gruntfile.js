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
                files: ['public/scss/*.scss', 'server/**/*.ejs']
            ,   tasks: ['compass']
            ,   options: {
                    livereload: true
                ,   spawn: false
                }
            }
        }
    ,   copy: {
            icons: {
                files: [{
                    expand: true
                ,   src: 'public/bower_components/sass-bootstrap/fonts/*'
                ,   dest: 'public/fonts'
                ,   filter: 'isFile'
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