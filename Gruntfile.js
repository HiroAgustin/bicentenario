module.exports = function (grunt)
{
    // Load all Grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        clean: ['.tmp']
    ,   compass: {
            options: {
                sassDir: 'public/sass'
            ,   cssDir: '.tmp/css'
            }
        ,   dist: {
                options: {

                }
            }
        }
    ,   cssmin: {
            dist: {
                files: {
                    'public/styles/main.css': ['.tmp/css/main.css']
                }
            }
        }
    ,   buildcontrol: {
            options: {
                commit: true
            ,   push: true
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

    grunt.registerTask('build', {
        'clean'
    ,   'compass'
    ,   'cssmin'
    });

    grunt.registerTask('deploy', {
        'build'
    ,   'buildcontrol'
    });

    grunt.registerTask('default', [
        'build'
    ]);
};