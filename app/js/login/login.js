'use strict';

angular.module('app.login', [])

.config(function($stateProvider) {

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'js/login/login.tpl.html',
      controller: 'LoginController'
    });
})

.controller('LoginController', function($scope, $state) {
  $scope.logIn = function(user) {
    console.log('log in user', user);
    $state.transitionTo('app.ionikit');
  };
});
