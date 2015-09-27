module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*\n' +
      ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
      ' * <%= pkg.description %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' *\n' +
      ' * Made by <%= pkg.author %>\n' +
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
      dist: {
        src: ['src/metisMenu.js'],
        dest: 'dist/metisMenu.js'
      }
    },
    uglify: {
      plugin: {
        src: ['dist/metisMenu.js'],
        dest: 'dist/metisMenu.min.js'
      }
    },
    postcss: {
      dev: {
        options: {
          processors: [
            require('pixrem')(), // add fallbacks for rem units
            require('autoprefixer')({
              browsers: [
                'Android 2.3',
                'Android >= 4',
                'Chrome >= 20',
                'Firefox >= 24',
                'Explorer >= 8',
                'iOS >= 6',
                'Opera >= 12',
                'Safari >= 6'
              ]
            }) // add vendor prefixes
          ]
        },
        files: {
          'dist/metisMenu.css': ['src/metisMenu.css']
        }
      },
      min: {
        options: {
          processors: [
            require('pixrem')(), // add fallbacks for rem units
            require('autoprefixer')({
              browsers: [
                'Android 2.3',
                'Android >= 4',
                'Chrome >= 20',
                'Firefox >= 24',
                'Explorer >= 8',
                'iOS >= 6',
                'Opera >= 12',
                'Safari >= 6'
              ]
            }), // add vendor prefixes
            require('cssnano')
          ]
        },
        files: {
          'dist/metisMenu.min.css': ['src/metisMenu.css']
        }
      }
    },
    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      files: {
        src: 'dist/*.{css,js}'
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        hostname: 'localhost',
        base: [
          'dist',
          'test',
          'bower_components'
        ]
      },
      livereload: {
        options: {
          open: true
        }
      }
    },
    watch: {
      script: {
        files: ['src/**/*.js'],
        tasks: ['concat', 'uglify', 'usebanner']
      },
      style: {
        files: ['src/**/*.css'],
        tasks: ['postcss', 'usebanner']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'test/{,*/}*.html',
          'dist/{,*/}*.css',
          'dist/{,*/}*.js'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask('travis', ['jshint']);
  grunt.registerTask('serve', ['connect:livereload', 'watch']);
  grunt.registerTask('default', [
    'jshint',
    'concat',
    'uglify',
    'postcss',
    'usebanner'
  ]);
};
