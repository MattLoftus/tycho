module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dependencies: {
        src: [
          "client/lib/jquery/dist/jquery.min.js",
          "client/lib/angular/angular.min.js",
          "client/lib/angular-ui-router/release/angular-ui-router.min.js",
          "client/lib/angular-jwt/dist/angular-jwt.min.js"
        ],
        dest: 'client/dist/dependencies.min.js'
      }
    },

    sass: {
      dist: {
        files: {
          'client/styles/styles.css' : 'client/sass/styles.scss'
        }
      }
    },

    watch: {
      css: {
        files: ['client/sass/styles.scss'],
        tasks: ['sass']
      }
    },

    shell: {
      seed: {
        options: {
          stdout: true,
          stderr: true
        },
        command: 'node server/db/seed.js'
      }
    },

    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  grunt.registerTask('build', [
    'concat',
    'sass'  
  ]);

  grunt.registerTask('default', [
    'build',
    'server-dev'
  ]);

};
