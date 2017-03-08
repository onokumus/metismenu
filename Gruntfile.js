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

    eslint: {
      target: ['src/*.js']
    },
    concat: {
      dist: {
        src: ['src/import.js', 'src/metisMenu.js'],
        dest: '.tmp/metisMenu.js'
      }
    },
    babel: {
      options: {
        // presets: ['es2015'],
        // plugins: ['transform-es2015-modules-umd']
      },
      dist: {
        files: {
          'dist/metisMenu.js': '.tmp/metisMenu.js'
        }
      }
    },
    uglify: {
      plugin: {
        options: {
            sourceMap: true,
            sourceMapName: 'dist/metisMenu.js.map'
        },
        files: {
          'dist/metisMenu.min.js': ['dist/metisMenu.js']
        }
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
        tasks: ['concat', 'babel', 'uglify', 'usebanner']
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

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('travis', ['eslint']);
  grunt.registerTask('serve', ['connect:livereload', 'watch']);
  grunt.registerTask('default', [
    'eslint',
    'concat',
    'babel',
    'uglify',
    'postcss',
    'usebanner'
  ]);
};
