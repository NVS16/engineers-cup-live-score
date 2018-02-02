'use strict';

angular.module('scoreApp')
    .controller('TennisCtrl', function ($scope) {

        $scope.tennisScoreBoard = {}

        socket.emit("join-tennis");

        socket.on("joined-tennis", function (data) {
            console.log(data);
            $scope.$apply(function () {
                $scope.tennisScoreBoard = data;
            });
        });

        socket.on("tennis-updated", function (data) {
            console.log("an update");
            $scope.$apply(function () {
                $scope.tennisScoreBoard = data;
            });
        })
    });
