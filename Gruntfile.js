module.exports = function(grunt) {

  grunt.initConfig({

    // Meta
    pkg: grunt.file.readJSON('package.json'),

    // TODO: Set your folder paths here without the trailing slash('/'). For example 'dist/css'
    path: {
      imagesPath: 'images',
      fontsPath: 'fonts',
      sassPath: 'sass',
      cssPath: 'dist/css',
      jsPath: 'js',
      distJsPath: 'dist/js'
    },  // path

    compass: {
      dev: {
        options: {
          imagesDir: "<%= path.imagesPath %>",
          fontsDir: "<%= path.fontsPath %>",
          sassDir: "<%= path.sassPath %>",
          cssDir: "<%= path.cssPath %>",
          sourcemap: true,
          specify: '<%= path.sassPath %>/site.sass'
        } // options
      }
    }, // compass

    watch: {
      options: {
        livereload: true
      }, // options
      gruntfile: {
        files: 'Gruntfile.js',
        options: {
          livereload: false
        }
      }, // gruntfile

      php: {
        files: "{,*/}*.php"
      }, // php

      html: {
        files: "{,*/}*.html"
      }, // html

      compass: {
        files: [
          "<%= path.sassPath %>/{,*/}*.scss",
          "<%= path.sassPath %>/partials/{,*/}*.scss",
          "<%= path.sassPath %>/partials/{,*/}*.sass",
          "<%= path.sassPath %>/{,*/}*.sass"
        ],
        tasks: ['compass', 'cssmin'],
        options: {
          livereload: false
        }
      },

      css_min: {
        files: '<%= path.cssPath %>/site.css',
        tasks: ['cssmin'],
        options: {
          livereload: true
        },
      },

      css_dist: {
        files: '<%= path.cssPath %>/site.min.css',
        options: {
          livereload: true
        },
      },

      js: {
        files: '<%= concat.js.src %>',
        options: {
          livereload: false
        },
        tasks: ['concat:js', 'uglify:js']
      }, //js group

      js_dist: {
        files: '<%= path.distJsPath %>/app.min.js',
        options: {
          livereload: true
        }
      }

    }, // watch

    concat: {
      options: {
        separator: ';'
      },
      js: {
        // TODO: Add or remove files here for the javascript files concatenation (add it in the correct order you need it to be)
        src: [
          // '<%= path.jsPath %>/vendor/jquery-1.12.0.min.js',
          // '<%= path.jsPath %>/vendor/bootstrap.min.js',
          '<%= path.jsPath %>/app.js'
        ],
        dest: '<%= path.distJsPath %>/app.js'
      }, // js
    }, // concat

    uglify: {
      js: {
        files: {'<%= path.distJsPath %>/app.min.js': ['<%= path.distJsPath %>/app.js']}
      }
    }, //uglify

    cssmin: {
      dist: {
        files: {'<%= path.cssPath %>/styles.min.css': ['<%= path.cssPath %>/styles.css']}
      }
    }, //minify
    postcss: {
      options: {
        map: true, // inline sourcemaps

        // or
        map: {
            inline: false, // save all sourcemaps as separate files...
            annotation: '<%= path.cssPath %>/' // ...to the specified directory
        },

        processors: [
          //require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: '<%= path.cssPath %>/styles.css'
      }
    }
  });


    grunt.loadNpmTasks("grunt-contrib-compass");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks('grunt-postcss');

    grunt.registerTask("default", ['compass', 'postcss']);

}
