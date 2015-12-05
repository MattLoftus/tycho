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

    uglify: {
      client: {
        src: [
          'client/dist/client.js'
        ],
        dest: 'client/dist/client.min.js'
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

  grunt.registerTask('build', [
    'concat'
  ]);

  grunt.registerTask('default', [
    'build',
    'nodemon'
  ]);

};
