/**
 * tip Component
 *
 * @class TipComponent
 * @module Hightail
 * @submodule Hightail.Components
 *
 * @example
 *    <ht-tip></ht-tip>
 *
 * @author hunter.novak
 * @since 0.0.1
 *
 * @copyright (c) 2015 Hightail Inc. All Rights Reserved
 */
'use strict';

angular.wilson.component('tip', {
  
  controller: ['$scope',
    function($scope) {
      var controller = this;

      $scope.isActive = false;
      controller.setState({
        initial: 'Hidden',
        events: [
          { name: 'show',   from: 'Hidden',   to: 'Visible' },
          { name: 'hide',   from: 'Visible',  to: 'Hidden' },
          { name: 'toggle', from: 'Hidden',   to: 'Visible' },
          { name: 'toggle', from: 'Visible',  to: 'Hidden' },
          { name: 'lock',   from: '*',        to: 'Locked' },
          { name: 'unlock', from: 'Locked',   to: 'Visible' }
        ],
        timeouts: [
          {state: 'Visible', duration: 3000, timeoutEvent: 'hide', refreshEvent: 'show'}
        ],
        callbacks: {}
      });

    }
  ],
  
  link: function($scope, $element, $attrs, controller) {
    var parentEl = $element.parent();

    if (parentEl) {
      var onMouseEnterParent = function() {
        $scope.$apply(function() {
          $scope.isActive = true;
          $scope.stateMachine.show();
        });
      };
      parentEl.on('mouseenter', onMouseEnterParent);

      var onMouseLeaveParent = function() {
        $scope.$apply(function() {
          $scope.isActive = false;
          $scope.stateMachine.hide();
        });
      };
      parentEl.on('mouseleave', onMouseLeaveParent);

      //if you poop, you scoop
      $element.on('$destroy', function() {
        parentEl.off('mouseenter', onMouseEnterParent);
        parentEl.off('mouseleave', onMouseLeaveParent);
      });
    }
  }
  
});
