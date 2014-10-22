'use strict';

angular.module('app.ionikit', [])

.config(function($stateProvider) {

  $stateProvider
    .state('app.ionikit', {
      url: '/ionikit',
      views: {
        'menuContent': {
          templateUrl: 'js/ionikit/ionikit.tpl.html',
          controller: 'IonikitController'
        }
      }
    });
})

.controller('IonikitController', function() {

});
