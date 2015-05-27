/**
 * Hightail Application Module
 *
 * All Modules are Registered with this primary angular app module.
 *
 * @module Hightail
 * @main Hightail
 *
 * @author hunter.novak
 * @since 0.0.1
 *
 * @copyright (c) 2013 Hightail Inc. All Rights Reserved
 */
(function(angular) {
  'use strict';

  angular.module('wilsonSeed', ['ngResource', 'ngAnimate', 'ngSanitize', 'wilson'])

    .run(['$rootScope', '$window', function($rootScope, $window) {
      // Assign Retina Class to Body
      if ($window.devicePixelRatio && $window.devicePixelRatio > 1) {
        angular.element('body').addClass('retina');
      }

      // Root Scope Global State Data and Flags
      $rootScope.page = { title: 'Wilson Seed App'  };
    }

  ]);

})(window.angular);