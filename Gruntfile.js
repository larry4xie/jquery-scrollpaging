module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cssmin: {
            scrollpaging: {
                options: {
                    report: "gzip"
                },
                files: {
                    "dist/jquery.scrollpaging.min.css": "src/jquery.scrollpaging.css"
                }
            }
        },

        uglify: {
            scrollpaging: {
                options: {
                    preserveComments: false,
                    report: "gzip"
                },
                files: {
                    "dist/jquery.scrollpaging.min.js": "src/jquery.scrollpaging.js"
                }
            }
        }
    });

    // load
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // task
    grunt.registerTask('default', ['cssmin:scrollpaging', 'uglify:scrollpaging']); // default
};