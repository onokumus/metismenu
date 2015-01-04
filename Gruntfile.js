'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*\n' +
      ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
      ' * <%= pkg.description %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' *\n' +
      ' * Made by <%= pkg.author.name %>\n' +
      ' * Under <%= pkg.license %> License\n' +
      ' */\n',

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'src/metisMenu.js'
      ]
    },
    concat: {
      plugin: {
        options: {
          banner: '<%= banner %>'
        },
        src: ['src/metisMenu.js'],
        dest: 'dist/metisMenu.js'
      },
      css: {
        src: ['src/metisMenu.css'],
        dest: 'dist/metisMenu.css'
      }      
    },
    uglify: {
      plugin: {
        src: ['dist/metisMenu.js'],
        dest: 'dist/metisMenu.min.js'
      },
      options: {
        banner: '<%= banner %>'
      }
    },
    cssmin: {
      options: {
        banner: '<%= banner %>'
      },
      menucss: {
        src: ['src/metisMenu.css'],
        dest: 'dist/metisMenu.min.css'
      }
    },
    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      files: {
        src: 'dist/*.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-banner');

  grunt.registerTask('travis', ['jshint']);
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin', 'usebanner']);
};
