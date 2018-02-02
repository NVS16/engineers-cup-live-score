'use strict';

/**
 * @ngdoc function
 * @name scoreApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the scoreApp
 */
angular.module('scoreApp')
    .controller('AdminCtrl', function ($scope) {

        $scope.selectedGame = "football";
        socket.emit("join-football");
        socket.on("joined-football", function (data) {
            console.log(data);
            $scope.$apply(function () {
                $scope.footballScoreBoard = data;
            });
        });


        /////////////////////////////////////////////////
        ////////// for football scoreboard /////////////
        /////////////////////////////////////////////////

        $scope.footballScoreBoard = {};

        $scope.addFootballScore1 = function (name) {
            var d = new Date();
            $scope.footballScoreBoard.team1.scores.push({
                "time": d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
                "scorer": name
            });
            $scope.updateFootball();
        }

        $scope.updateFootball = function () {
            socket.emit("update-football", $scope.footballScoreBoard);
        }

        $scope.commentFootball = function (text) {
            var d = new Date();
            $scope.footballScoreBoard.commentary.push({
                "time": d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
                "text": text
            });
            $scope.updateFootball();
        }

        ////////////////////////////////////////////////

        /////////////////////////////////////////////////
        ////////// for tennis scoreboard ////////////////
        /////////////////////////////////////////////////

        $scope.tennisScoreBoard = {
            "setNumber": 0,
            "isHalfTime": false,
            "isLive": true,
            "player1": {
                "college": null,
                "name": null,
                "points": 0,
                "setWins": 0
            },
            "player2": {
                "college": null,
                "name": null,
                "points": 0,
                "setWins": 0
            },
            "commentary": [{ "time": "00", "text": "Comments" }]
        };

        $scope.updateTennis = function () {
            socket.emit("update-tennis", $scope.tennisScoreBoard);
        }

        $scope.commentTennis = function (text) {
            var d = new Date();
            $scope.tennisScoreBoard.commentary.push({
                "time": d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
                "text": text
            });
            $scope.updateTennis();
        }

        /////////////////////////////////////////////////
        ////////// for badminton scoreboard /////////////
        /////////////////////////////////////////////////

        $scope.badmintonScoreBoard = {
            "setNumber": 0,
            "isHalfTime": false,
            "isLive": true,
            "player1": {
                "college": null,
                "name": null,
                "points": 0,
                "setWins": 0
            },
            "player2": {
                "college": null,
                "name": null,
                "points": 0,
                "setWins": 0
            },
            "commentary": [{ "time": "00", "text": "Comments" }]
        };

        $scope.updateBadminton = function () {
            socket.emit("update-badminton", $scope.badmintonScoreBoard);
        }

        $scope.commentBadminton = function (text) {
            var d = new Date();
            $scope.badmintonScoreBoard.commentary.push({
                "time": d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
                "text": text
            });
            $scope.updateBadminton();
        }


        ////////////////////////////////////////////////
        ///////////// UPDATION EVENTS //////////////////
        ////////////////////////////////////////////////

        socket.on("football-updated", function (data) {
            console.log("an update");
            $scope.$apply(function () {
                $scope.footballScoreBoard = data;
            });
        });

        socket.on("tennis-updated", function (data) {
            console.log("an update");
            $scope.$apply(function () {
                $scope.tennisScoreBoard = data;
            });
        });

        socket.on("badminton-updated", function (data) {
            console.log("an update");
            $scope.$apply(function () {
                $scope.badmintonScoreBoard = data;
            });
        });

        ///////////////////////////////////////////////

        ///////////////////////////////////////////////
        ////// function to select room for admin //////
        ///////////////////////////////////////////////

        $scope.changeRoom = function (name) {
            switch (name) {
                case "football":
                    socket.emit("join-football");
                    socket.on("joined-football", function (data) {
                        console.log(data);
                        $scope.$apply(function () {
                            $scope.footballScoreBoard = data;
                        });
                    });
                    break;
                case "table-tennis":
                    socket.emit("join-tennis");
                    socket.on("joined-tennis", function (data) {
                        console.log(data);
                        $scope.$apply(function () {
                            $scope.tennisScoreBoard = data;
                        });
                    });
                    break;
                case "badminton":
                    socket.emit("join-badminton");
                    socket.on("joined-badminton", function (data) {
                        console.log(data);
                        $scope.$apply(function () {
                            $scope.badmintonScoreBoard = data;
                        });
                    });
                    break;
            }
        }

    });

