// Generated on 2013-07-08 using generator-angular 0.3.0
'use strict';

var fs              = require('fs'),
    path            = require('path'),
    GruntUtils      = require('./server/utils/GruntUtils'),
    lodash          = require('lodash');
    lodash.str      = require('underscore.string');

// Setup Config
var packageConfig   = require('./package.json');
var commonConfig    = require('./server/config/common/app-config.json');
var envConfig       = require('./server/config/development/app-config.json');
var wilsonConfig    = require('./server/config/wilson-config.json');
var appConfig       = lodash.merge({}, wilsonConfig, commonConfig, envConfig);

var appPort         = appConfig.server.deploy.port || '3000';
var appUrl          = appConfig.server.deploy.protocol + '://localhost';
appUrl              += (appPort === '80' || appPort === '443') ? '' : (':' + appPort);


module.exports = function(grunt) {
  // Load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Top Level Config
  var yeomanConfig = {
    root:             '.',
    client:           'client',
    server:           'server',
    dist:             'dist',
    cache:            'server/.cache',
    sassCore:         'client/styles/core/',
    themeLoaders:     'client/styles/themes/',
    exports:          'client/styles/exports/',
    componentsCore:   'client/src/components',
    componentGlob:    '__components.scss'
  };

  var sassExports = {};
  var prefix = yeomanConfig.exports + packageConfig.version + '.';
  sassExports[prefix + 'base.css']      = 'client/styles/themes/base.scss';
  sassExports[prefix + 'wilson.css']    = 'client/styles/themes/wilson.scss';

  // Provision Exports directory
  grunt.file.mkdir(yeomanConfig.exports, '0755');

  // Change Lists Tracking
  var changedFiles = {};
  var onRestartRequiredChange = grunt.util._.debounce(function() {
    var changes = changedFiles;
    var deletionsPresent = lodash.find(changes, function(changeItem) {
      return lodash.any(changeItem, function(item) { return item.action === 'deleted'; });
    });

    if (deletionsPresent) {
      grunt.task.run(['clean:server', 'express:dev']);
    } else {
      fs.writeFile(path.join(yeomanConfig.server, '.cache/change-list.json'), JSON.stringify(changes), function(err) {
        if (err) { throw err;}
        grunt.task.run(['clean:serverBasic', 'express:dev']);
      });
    }

    changedFiles = {};
  }, 100);

  grunt.event.on('watch', function(action, filepath, target) {
    if (target === 'clientCodeChange') {
      GruntUtils.trackChanges(changedFiles, action, filepath, target, onRestartRequiredChange, function() {
        grunt.task.run(['clean:serverBasic']);
      });
    }
  });

  // Grunt Config of All Tasks
  grunt.initConfig({
    pkg: packageConfig,
    yeoman: yeomanConfig,
    express: {
      dev: {
        options: {
          port: process.env.PORT || appConfig.server.deploy.port || 3000,
          script: 'server/app.js'
        }
      },
      prod: {
        options: {
          port: process.env.PORT || appConfig.server.deploy.port || 8080,
          script: 'dist/server/app.js'
        }
      }
    },
    shell: {
      installDependencies: {
        command: ['npm install', 'bower install'].join('&&'),
        options: {
          stdout: true
        }
      }
    },
    open: {
      dev: { path: appUrl, app: 'Google Chrome' }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: ['<%= yeoman.dist %>/*']
        }]
      },
      distCache:    ['<%= yeoman.dist %>/server/.cache'],
      server:       ['<%= yeoman.cache %>/*'],
      serverBasic:  ['<%= yeoman.cache %>/*.{js,*.json}']
    },
    'sass': {
      'options': {
        'imagePath': 'client/styles/',
        'includePaths': [],
        'outputStyle': 'nested',
        'sourceComments': 'normal',
        'precision': 5
      },
      'static': {
        'options': {
          'outputStyle': 'compressed',
          'sourceComments': 'none'
        },
        'files': sassExports
      },
      'debug': {
        'options': {
          'outputStyle': 'nested',
          'sourceComments': 'normal'
        },
        'files': sassExports
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/client/app.js',
            '<%= yeoman.dist %>/client/src/**/*.js',
            '<%= yeoman.dist %>/client/scripts/*.js',
            '!<%= yeoman.dist %>/client/src/lib/bower_components/**/*.*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.dist %>/server/templates/index.hbs',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/server/templates/index.hbs'],
      options: {
        dirs:     ['<%= yeoman.dist %>'],
        basedir:  '<%= yeoman.dist %>'
      }
    },
    uglify: {
      dist: {
        options: {
          compress: {
            'pure_funcs': ['console.log', 'console.dir', 'console.warn', 'console.error', 'console.info']
          }
        },
        files: GruntUtils.getJsSourceMap([
          'client/src/behaviors',
          'client/src/components',
          'client/src/filters',
          'client/src/services'
        ], yeomanConfig.dist)
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.root %>',
          dest: '<%= yeoman.dist %>',
          src: [
            'client/styles/exports/*.css',
            'client/styles/themes/**/*.*',
            'client/styles/images/**/*.*',
            '!client/styles/themes/**/*.scss',
            'client/locales/**/*.json',
            'client/src/{components,services,behaviors,filters}/**/*.{html,js}',
            'client/*.{js,json}',
            'INSTALL',
            'package.json',
            'node_modules/**/*.*',
            '!node_modules/grunt-*/**/*',
            '!node_modules/grunt/**/*',
            '!node_modules/yeoman-generator/**/*',
            '!node_modules/matchdep/**/*',
            '!cookbook',
            '!cookbook/**/*',
            'server/**/*.*',
            '!server/utils/GruntUtils.js'
          ]
        }]
      }
    }
  });

  grunt.registerTask('watch-dev-changes', function() {
    grunt.config('watch', {
      options: { interval: 3000 },  // Watch changes every 3 seconds
      sass: {
        files: ['<%= yeoman.client %>/styles/**/*.{scss,sass}'], // sass source changes (human-edited)
        tasks: ['sass:static']
      },
      componentStyles: {
        files: ['<%= yeoman.client %>/src/components/**/styles/*.{scss,sass}'], // sass component changes (human-edited)
        tasks: ['glob-sass-components', 'sass:static']
      },
      clientCodeChange: {
        options: { spawn: false },  // Without this option specified express won't be reloaded
        files: [
          '<%= yeoman.client %>/src/**/*.{js,html}',
          '<%= yeoman.client %>/locales/**/*.json',
          '!<%= yeoman.client %>/src/lib/bower_components/**'
        ]
      },
      serverCodeChange: {
        options: { spawn: false },  // Without this option specified express won't be reloaded
        files: [
          '<%= yeoman.server %>/**/*.{js,json,hbs}',
          '!<%= yeoman.server %>/.cache/**',
        ],
        tasks: ['clean:serverBasic', 'express:dev']
      }
    });

    grunt.task.run('watch');
  });

  grunt.registerTask('glob-sass-components', 'Generate globbed component sass imports.', function() {
    return GruntUtils.generateComponentSass(__dirname, yeomanConfig.sassCore, yeomanConfig.componentsCore, yeomanConfig.componentGlob);
  });

  grunt.registerTask('styles:static',         ['glob-sass-components', 'sass:static']);
  grunt.registerTask('styles:debug',          ['glob-sass-components', 'sass:debug']);

  grunt.registerTask('develop', function(target) {
    var tasks = ['clean:server', 'styles:static', 'express:dev', 'open:dev', 'watch-dev-changes'];

    if (target !== 'quick') {
      tasks.unshift('shell:installDependencies');
    }

    grunt.task.run(tasks);
  });

  grunt.registerTask('update-config', function() {
    var wilsonConfig = require('./server/config/wilson-config');

    // Get App JS filename
    var files     = fs.readdirSync('./dist/client');
    var appRegex  = /.*\.app\.js/;

    lodash.each(files, function(file) {
      if (appRegex.test(file)) { wilsonConfig.server.projectPaths.clientApp = '/client/' + file; }
    });

    fs.writeFileSync('./dist/server/config/wilson-config.json', JSON.stringify(wilsonConfig), { flag: 'w', mode: '644' });
  });

  grunt.registerTask('build', [
    'clean:dist', 'styles:static', 'copy', 'clean:distCache', 'useminPrepare', 'concat', 'uglify', 'rev', 'usemin', 'update-config'
  ]);

  grunt.registerTask('default', ['develop']);
};
