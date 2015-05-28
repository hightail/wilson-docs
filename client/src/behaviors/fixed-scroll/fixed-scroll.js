/**
 * fixed-scroll Behavior
 *
 * @class FixedScrollBehavior
 * @module Hightail
 * @submodule Hightail.Behaviors
 *
 * @example
 *    <element ht-fixed-scroll> </element>
 *
 *    Note: MUST be used as an attribute.
 *
 * @author hunter.novak
 * @since 0.0.1
 *
 * @copyright (c) 2013 Hightail Inc. All Rights Reserved
 */
'use strict';

angular.wilson.behavior('fixed-scroll', function() {
  return {
    restrict: 'A',

    link: function($scope, $element, $attrs, controller) {

      /*** Behavior Logic Goes Here ***/
      var win       = $(window);
      var offset    = 0;
      var start     = parseInt($attrs.htFixedScroll, 10);
      var top       = parseInt($attrs.offsetTop, 10);
      var originTop = $($element).css('top');
      var originPos = $($element).css('position');

      win.on('scroll', function() {
        offset = win.scrollTop();
        if (offset > start) {
          $($element).css('position', 'fixed');
          $($element).css('top', top + 'px');
        } else if (offset < start) {
          $($element).css('top', originTop);
          $($element).css('position', originPos);
        }
      });

    }
  };
});

