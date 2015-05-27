/**
 * Created by hunter.novak on 10/7/14.
 *
 * Route Handling for index page
 */
var path  = require('path'),
    fs    = require('fs'),
    _     = require('lodash'),
    hbs   = require('hbs');

module.exports = function(wilsonConfig, app) {
  // Setup index template
  var indexHbsPath  = path.join(wilsonConfig.server.projectPaths.root, '/server/templates/index.hbs');
  var indexHbs      = fs.readFileSync(indexHbsPath, 'utf8');
  var indexTemplate = hbs.compile(indexHbs);

  // index page route handler
  return function(req, res) {
    var cssFileName     = _.str.sprintf('%s.%s.css', wilsonConfig.client.app.version, req.wilson.tags.brand);

    var browserClass    = req.wilson.tags.browser !== 'unknown' ? req.wilson.tags.browser : '';
    var browserVClass   = req.wilson.browser.version ? req.wilson.tags.browser + '-' + req.wilson.browser.version.replace('.', '-') : '';

    // Check Browser Supported
    var browserSupport  = (browserClass === 'ie' && parseFloat(req.wilson.browser.version) < 10) ? false : true;
    var cdnPrefix       = wilsonConfig.client.cdn ? wilsonConfig.client.cdn.protocol + '://' + wilsonConfig.client.cdn.host : '';

    var templateData    = {
      themeStylesheet:  cdnPrefix + '/client/styles/exports/' + cssFileName,
      baseHref:         '/' + req.locale,
      production:       app.get('env') === 'production',
      browserClasses:   browserClass + ' ' + browserVClass,
      browserSupported: browserSupport,
      heapAppIds:       JSON.stringify(wilsonConfig.client.heapAppIds)
    };

    var result = indexTemplate(_.merge(res.locals, templateData));

    //We need to make sure that the index page is not cached
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);

    res.send(result);
  }
};