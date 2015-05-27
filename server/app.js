var express               = require('express'),
    Wilson                = require('wilson'),
    http                  = require('http'),
    fs                    = require('fs'),
    path                  = require('path'),
    robots                = require('robots.txt'),
    compress              = require('compression'),
    _                     = require('lodash');
    _.str                 = require('underscore.string');

var app                   = module.exports = express();

// Load in Config
var env             = process.env.NODE_ENV || 'development';
var packageConfig   = require('../package.json');
var commonConfig    = require('./config/common/app-config.json');
var envConfig       = require('./config/' + env + '/app-config.json');
var overrideConfig  = process.env.EXT_CONFIG_PATH ? require(process.env.EXT_CONFIG_PATH) : {};
var wilsonConfig    = require('./config/wilson-config.json');
var appConfig       = _.merge({}, wilsonConfig, commonConfig, envConfig, overrideConfig);

// express configuration
app.set('port',     appConfig.server.deploy.port);
app.set('env',      appConfig.server.deploy.mode);
app.set('protocol', appConfig.server.deploy.protocol || 'http');

// Print some env info
console.log('Release Version: [' + packageConfig.version + ']');
console.log('Environment:     [' + app.get('env') + ']');
console.log('Storage Domain:  [' + appConfig.client.storageDomain + ']');

// Forward Requests to https
app.use(function(req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'http') {
    res.redirect(301, 'https://' + req.headers.host + req.path);
  } else {
    return next();
  }
});

// Use Compressed output
app.use(compress());

// Robots.txt
app.use(robots(__dirname + '/robots.txt'));

// version
appConfig.client.app.version = packageConfig.version;

// Load Wilson
var wilson = Wilson(app, appConfig);

// Setup Wilson on the Express App
app.use(wilson.config.client.app.mountpath, wilson.router);

// express middleware
app.use('/client', express.static(path.join(__dirname, '../client'), { maxAge: parseInt(wilson.config.server.caching.maxAge.assets, 10) }));

// index route - For all other requests serve the index page
app.get('*', wilson.middleware, require('./routes/index')(wilson.config, app));

// start the server
http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on http port ' + app.get('port'));
});





