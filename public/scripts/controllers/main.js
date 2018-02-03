'use strict';

/**
 * @ngdoc function
 * @name scoreApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the scoreApp
 */
angular.module('scoreApp')
  .controller('MainCtrl', function ($scope, $location) {
    
    $scope.password = "";
    $scope.login = function(){
      if($scope.password === "admin") {
        $location.path('/admin');
      } else {
        alert($scope.password);
      }
    };
  });
