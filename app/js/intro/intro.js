'use strict';

angular.module('app.intro', [])

.config(function($stateProvider) {

  $stateProvider
    .state('intro', {
      url: '/intro',
      templateUrl: 'js/intro/intro.tpl.html',
      controller: 'IntroController'
    });
})

.controller('IntroController', function($scope, $state) {
  $scope.getStarted = function() {
    $state.transitionTo('login');
  };
});
