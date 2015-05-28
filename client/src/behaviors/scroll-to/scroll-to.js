/**
 * scroll-to Behavior
 *
 * @class ScrollToBehavior
 * @module Hightail
 * @submodule Hightail.Behaviors
 *
 * @example
 *    <element ht-scroll-to> </element>
 *
 *    Note: MUST be used as an attribute.
 *
 * @author hunter.novak
 * @since 0.0.1
 *
 * @copyright (c) 2013 Hightail Inc. All Rights Reserved
 */
'use strict';

angular.wilson.behavior('scroll-to', function() {
  return {
    restrict: 'A',

    link: function($scope, $element, $attrs, controller) {

      /*** Behavior Logic Goes Here ***/
      var eventType = $attrs.scrollEvent || 'click';
      var scrollTarget = $attrs.htScrollTo;
      var win = $('html, body');

      $($element).on(eventType, function(evt) {
        var offset = Math.round($(scrollTarget).offset().top);
        win.animate({ scrollTop: (offset - 40) + 'px' }, 500);
      });

    }
  };
});

