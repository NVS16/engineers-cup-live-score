'use strict';

angular.module('scoreApp')
  .controller('BasketballCtrl', function ($scope) {

    $scope.basketballScoreBoard = {}

    socket.emit("join-basketball");

    socket.on("joined-basketball", function (data) {
      console.log(data);
      $scope.$apply(function () {
        $scope.basketballScoreBoard = data;
      });
    });

    socket.on("basketball-updated", function (data) {
      console.log("an update");
      $scope.$apply(function () {
        $scope.basketballScoreBoard = data;
      });
    })


  });
