/**
 * IRouteService
 *
 * @class IRouteService
 * @module Hightail
 * @submodule Hightail.Services
 *
 * @author justin.fiedler
 * @since 0.0.1
 *
 * @copyright (c) 2014 Hightail Inc. All Rights Reserved
 */
'use strict';

angular.wilson.service('IRouteService',
  ['$window', '$location', '$rootScope', '$route',
    function($window, $location, $rootScope, $route) {

      //
      //                       o                        |    |             |
      //  ,---.,---.,---..    ,.,---.,---.    ,-.-.,---.|--- |---.,---.,---|,---.
      //  `---.|---'|     \  / ||    |---'    | | ||---'|    |   ||   ||   |`---.
      //  `---'`---'`      `'  ``---'`---'    ` ' '`---'`---'`   '`---'`---'`---'
      //:


      /**
       * Handle top level route change in the application (i.e. URL navigation)
       *
       * Evaluates routeOptions against the current app state. Applies page transitional classes.
       *
       * Returns true if standard application routing should continue routing or false if there is
       * special non-standard routing required.
       *
       * @param currentRoute
       * @param routeOptions
       * @param routeInfo
       * @returns {boolean}
       */
      function handleRouteChange(currentRoute, routeOptions, routeInfo) {
        var routeLocal      = true;

        // Provide a forward option for routing
        if (routeOptions.forward) {
          // If we are forwarding, cancel local routing and immediately update the location to the forwarding path
          $location.path(routeOptions.forward);
          return false;
        }

        // Now update our page title if we are not going to route locally (as this step will be skipped if we don't!)
        if (!routeLocal) {
          $rootScope.page.title = _.template(routeInfo.title)($route.current.params);
        }

        return routeLocal;
      }


      /**
       * Translate and template the route title.
       *
       * This method should apply any appropriate templating and/or tranform to the route.title.
       *
       * @param routeTitle
       * @returns {*}
       */
      function translateTitle(routeTitle) {
        // Update page title
        if (routeTitle) {
          var content = 'Wilson Seed App';

          try {
            content = _.template(routeTitle)($route.current.params);
          } catch (err) { }

          return content;
        }

        return false;
      }


      /************************************/
      /******** SERVICE INTERFACE *********/
      /************************************/
      var service = {
        handleRouteChange:  handleRouteChange,
        translateTitle:     translateTitle
      };

      return service;
    }
  ]
);
