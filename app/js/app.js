'use strict';
angular.module('App', [
  'ionic',
  'ngCordova',
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

.config(function() {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
});
