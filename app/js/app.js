'use strict';

angular.module('App', [
  'ionic',
  'ngCordova',
  'app.intro',
  'app.login',
  'app.ionikit'
])

.run(function($ionicPlatform, $window, $cordovaStatusbar, $cordovaKeyboard) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if($window.cordova && $window.cordova.plugins.Keyboard) {
      $cordovaKeyboard.hideKeyboardAccessoryBar(true);
    }
    if($window.StatusBar) {
      $cordovaStatusbar.styleDefault();
    }
  });
})

.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      templateUrl: 'js/app.tpl.html',
      controller: 'AppController'
    });

  $urlRouterProvider.otherwise('/intro');
})

.controller('AppController', function() {

});
