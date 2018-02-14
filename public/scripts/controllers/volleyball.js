'use strict';

/**
 * @ngdoc function
 * @name scoreApp.controller:VolleyballCtrl
 * @description
 * # VolleyballCtrl
 * Controller of the scoreApp
 */
angular.module('scoreApp')
  .controller('VolleyballCtrl', function ($scope) {

    $scope.volleyballScoreBoard = {}

        socket.emit("join-volleyball");

        socket.on("joined-volleyball", function (data) {
            console.log(data);
            $scope.$apply(function () {
                $scope.volleyballScoreBoard = data;
            });
        });

        socket.on("volleyball-updated", function (data) {
            console.log("an update");
            $scope.$apply(function () {
                $scope.volleyballScoreBoard = data;
            });
        })

  });
