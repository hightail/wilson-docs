/**
 * mark-page-scroll Behavior
 *
 * @class MarkPageScrollBehavior
 * @module Hightail
 * @submodule Hightail.Behaviors
 *
 * @example
 *    <element ht-mark-page-scroll> </element>
 *
 *    Note: MUST be used as an attribute.
 *
 * @author hunter.novak
 * @since 0.0.1
 *
 * @copyright (c) 2014 Hightail Inc. All Rights Reserved
 */
'use strict';

angular.wilson.behavior('mark-page-scroll',

  // Behavior Definition
  function() {
  
    return {
      restrict: 'A',

      link: function($scope, $element, $attrs, controller) {
        var win = $(window);
        var startThreshold = parseInt($attrs.htMarkPageScroll, 10) || 0;
        win.on('scroll', function() {
          var currentScroll = win.scrollTop();
          if (currentScroll > startThreshold) {
            $element.addClass('scroll-active');
          } else {
            $element.removeClass('scroll-active');
          }
        });

      }
    };

  }
);

