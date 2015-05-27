/**
 * Sets up an event bus for a given element by ID.
 *
 * @class EventBusBehavior
 * @module Hightail
 * @submodule Hightail.Behaviors
 *
 * @example
 *    <element event-bus="busId"></element>
 *
 * @author justin.fiedler
 * @since 0.0.1
 *
 * @copyright (c) 2013 Hightail Inc. All Rights Reserved
 */
'use strict';

angular.wilson.behavior('event-bus', {
  priority: -1,

  controller: ['BusFactoryService', function(BusFactoryService) {
    var controller = this;
    controller.BusFactoryService = BusFactoryService;
  }],

  link: function($scope, $element, $attrs, controller) {

    /**
     * The bus id for the event bus.
     *
     * @property busId
     * @type String
     */
    var busId = $attrs.htEventBus;

    if (busId) {
      $scope.eventBus = controller.BusFactoryService.get(busId);
    }
  }
});
