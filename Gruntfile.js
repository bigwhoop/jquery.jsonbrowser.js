module.exports = function(grunt) {
    var src_files = ['src/jquery.jsonbrowser.js'];
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            default: {
                options: {
                    banner: '/*! <%= pkg.name %> v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>) | http://github.com/bigwhoop/jquery.jsonbrowser.js | MIT License */\n'
                },
                src: src_files,
                dest: 'build/jquery.jsonbrowser.min.js'
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.registerTask('default', ['uglify']);
};