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
    });

    grunt.registerTask('default', [
        'clean'
    ,   'compass'
    ,   'cssmin'
    ]);
};