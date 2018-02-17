'use strict';

angular.module('scoreApp')
    .controller('BadmintonCtrl', function ($scope) {

        $scope.badmintonScoreBoard = {}

        socket.emit("join-badminton");

        socket.on("joined-badminton", function (data) {
            console.log(data);
            $scope.$apply(function () {
                $scope.badmintonScoreBoard = data;
            });
        });

        socket.on("badminton-updated", function (data) {
            console.log("an update");
            $scope.$apply(function () {
                $scope.badmintonScoreBoard = data;
            });
        });
    });
