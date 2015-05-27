/**
 * Created by hunter.novak on 10/18/14.
 */
var browser   = require('bowser').browser,
    _         = require('lodash');

module.exports = function(req, res, next) {
  var browserInfo = {};
  var userAgent   = req.headers['user-agent'];

  if (!_.isEmpty(userAgent)) {
    var detectedBrowser = browser._detect(userAgent);

    if (detectedBrowser) {
      if      (detectedBrowser.msie)    { browserInfo.name = 'ie';      }
      else if (detectedBrowser.chrome)  { browserInfo.name = 'chrome';  }
      else if (detectedBrowser.firefox) { browserInfo.name = 'firefox'; }
      else if (detectedBrowser.safari)  { browserInfo.name = 'safari';  }
      else if (detectedBrowser.opera)   { browserInfo.name = 'opera';   }
      else                              { browserInfo.name = 'unknown'  }

      browserInfo.version = detectedBrowser.version ? detectedBrowser.version : '';
    }
  }

  req.wilson.browser = browserInfo;
  req.wilson.tags.browser = browserInfo.name;
  next();
};

