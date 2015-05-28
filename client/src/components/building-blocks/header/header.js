/**
 * header Component
 *
 * @class HeaderComponent
 * @module Hightail
 * @submodule Hightail.Components
 *
 * @example
 *    <ht-header></ht-header>
 *
 * @author hunter.novak
 * @since 0.0.1
 *
 * @copyright (c) 2015 Hightail Inc. All Rights Reserved
 */
'use strict';

angular.wilson.component('header', {
  
  controller: ['$scope',
    function($scope) {
      var controller = this;

      //  controller.setState({
      //    initial: '',
      //    events: [
      //      { name: '',  from: '',  to: '' }
      //    ],
      //    timeouts: [],
      //    callbacks: {}
      //  });

    }
  ],
  
  link: function($scope, $element, $attrs, controller) {

  }
  
});
