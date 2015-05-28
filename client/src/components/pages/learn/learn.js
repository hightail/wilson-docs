/**
 * learn Component
 *
 * @class LearnComponent
 * @module Hightail
 * @submodule Hightail.Components
 *
 * @example
 *    <ht-learn></ht-learn>
 *
 * @author hunter.novak
 * @since 0.0.1
 *
 * @copyright (c) 2015 Hightail Inc. All Rights Reserved
 */
'use strict';

angular.wilson.component('learn', {
  page: true,
  controller: ['$scope',
    function($scope) {
      var controller = this;

      $scope.menuOptions = [
        { name: 'Pages',            section: 'pages'        },
        { name: 'Components',       section: 'components'   },
        { name: 'Routing',          section: 'routing'      },
        { name: 'Behaviors',        section: 'behaviors'    },
        { name: 'Filters',          section: 'filters'      },
        { name: 'Services',         section: 'services'     },
        { name: 'Parsers',          section: 'parsers'      },
        { name: 'Guides',           section: 'guides'       },
        { name: 'Theming',          section: 'theming'      }
      ];
    }
  ]
  
});
