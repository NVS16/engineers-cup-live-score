'use strict';

/**
 * @ngdoc function
 * @name scoreApp.controller:CricketCtrl
 * @description
 * # CricketCtrl
 * Controller of the scoreApp
 */
angular.module('scoreApp')
  .controller('CricketCtrl', function ($scope) {
    
    $scope.cricketScoreBoard = {}

        socket.emit("join-cricket");

        socket.on("joined-cricket", function (data) {
            console.log(data);
            $scope.$apply(function () {
                $scope.cricketScoreBoard = data;
            });
        });

        socket.on("cricket-updated", function (data) {
            console.log("an update");
            $scope.$apply(function () {
                $scope.cricketScoreBoard = data;
            });
        });

  });
