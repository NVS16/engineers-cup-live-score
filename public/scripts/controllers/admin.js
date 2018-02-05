'use strict';

/**
 * @ngdoc function
 * @name scoreApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the scoreApp
 */
angular.module('scoreApp')
    .controller('AdminCtrl', function ($scope , $location , loginservice) {

        if(!loginservice.isLoggedIn()) $location.path('/');

        $scope.selectedGame = "football";
        socket.emit("join-football");
        socket.on("joined-football", function (data) {
            console.log(data);
            $scope.$apply(function () {
                $scope.footballScoreBoard = data;
            });
        });

        var defaultfootballScoreBoard = {
            "isHalfTime": false,
            "isLive": false,
            "team1": {
                "name": null,
                "scores": [/*{ "time": 0, "scorer": null }*/]
            },
            "team2": {
                "name": null,
                "scores": [/*{ "time": 0, "scorer": null }*/]
            },
            "commentary": [/*{ "time": "0000", "text": "Comments" }*/]
        };

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

        $scope.addFootballScore2 = function (name) {
            var d = new Date();
            $scope.footballScoreBoard.team2.scores.push({
                "time": d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
                "scorer": name
            });
            $scope.updateFootball();
        }

        $scope.delFootballScore1 = function (index) {
            $scope.footballScoreBoard.team1.scores.splice(index, 1);
            $scope.updateFootball();
        }

        $scope.delFootballScore2 = function (index) {
            $scope.footballScoreBoard.team2.scores.splice(index, 1);
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


        $scope.resetGameFootball = function () {
            $scope.footballScoreBoard = defaultfootballScoreBoard;
            $scope.updateFootball();
        };

        ////////////////////////////////////////////////

        /////////////////////////////////////////////////
        ////////// for tennis scoreboard ////////////////
        /////////////////////////////////////////////////

        $scope.tennisScoreBoard = {
            "setNumber": 1,
            "isBreak": false,
            "isLive": false,
            "setHistory": [],
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
            "commentary": [/*{ "time": "00", "text": "Comments" }*/]
        };
        var defaultTennisScoreBoard = $scope.tennisScoreBoard;

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


        $scope.changeTennisScore1 = function (i) {
            $scope.tennisScoreBoard.player1.points += i;
            $scope.updateTennis();
        };

        $scope.changeTennisSet1 = function (i) {
            $scope.tennisScoreBoard.player1.setWins += i;
            $scope.updateTennis();
        };

        $scope.changeTennisScore2 = function (i) {
            $scope.tennisScoreBoard.player2.points += i;
            $scope.updateTennis();
        };

        $scope.changeTennisSet2 = function (i) {
            $scope.tennisScoreBoard.player2.setWins += i;
            $scope.updateTennis();
        };

        $scope.endSetTennis = function () {
            if ($scope.tennisScoreBoard.player1.points > $scope.tennisScoreBoard.player2.points) {
                $scope.tennisScoreBoard.setHistory.push({
                    "setnumber": $scope.tennisScoreBoard.setNumber,
                    "winner": $scope.tennisScoreBoard.player1.name,
                    "loser": $scope.tennisScoreBoard.player2.name,
                    "winpoints": $scope.tennisScoreBoard.player1.points,
                    "losepoints": $scope.tennisScoreBoard.player2.points
                });
                $scope.tennisScoreBoard.player1.points = $scope.tennisScoreBoard.player2.points = 0;
                $scope.tennisScoreBoard.player1.setWins += 1;
                $scope.tennisScoreBoard.setNumber += 1;
                $scope.updateTennis();
            } else if ($scope.tennisScoreBoard.player1.points < $scope.tennisScoreBoard.player2.points) {
                $scope.tennisScoreBoard.setHistory.push({
                    "setnumber": $scope.tennisScoreBoard.setNumber,
                    "winner": $scope.tennisScoreBoard.player2.name,
                    "loser": $scope.tennisScoreBoard.player1.name,
                    "win-points": $scope.tennisScoreBoard.player2.points,
                    "loose-points": $scope.tennisScoreBoard.player1.points
                });
                $scope.tennisScoreBoard.player1.points = $scope.tennisScoreBoard.player2.points = 0;
                $scope.tennisScoreBoard.player2.setWins += 1;
                $scope.tennisScoreBoard.setNumber += 1;
                $scope.updateTennis();
            } else {
                alert("Both Scores Equal! Can't End Set Yet!");
            }
        };

        $scope.resetGameTennis = function () {
            $scope.tennisScoreBoard = defaultTennisScoreBoard;
            $scope.tennisScoreBoard.isLive = false;
            $scope.updateTennis();
        };

        /////////////////////////////////////////////////
        ////////// for badminton scoreboard /////////////
        /////////////////////////////////////////////////

        $scope.badmintonScoreBoard = {
            "setNumber": 1,
            "isBreak": false,
            "isLive": false,
            "setHistory": [],
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
            "commentary": [/*{ "time": "00", "text": "Comments" }*/]
        };

        var defaultBadmintonScoreBoard = $scope.badmintonScoreBoard;

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


        $scope.changeBadmintonScore1 = function (i) {
            $scope.badmintonScoreBoard.player1.points += i;
            $scope.updateBadminton();
        };

        $scope.changeBadmintonSet1 = function (i) {
            $scope.badmintonScoreBoard.player1.setWins += i;
            $scope.updateBadminton();
        };

        $scope.changeBadmintonScore2 = function (i) {
            $scope.badmintonScoreBoard.player2.points += i;
            $scope.updateBadminton();
        };

        $scope.changeBadmintonSet2 = function (i) {
            $scope.badmintonScoreBoard.player2.setWins += i;
            $scope.updateBadminton();
        };

        $scope.endSetBadminton = function () {
            if ($scope.badmintonScoreBoard.player1.points > $scope.badmintonScoreBoard.player2.points) {
                $scope.badmintonScoreBoard.setHistory.push({
                    "setnumber": $scope.badmintonScoreBoard.setNumber,
                    "winner": $scope.badmintonScoreBoard.player1.name,
                    "loser": $scope.badmintonScoreBoard.player2.name,
                    "winpoints": $scope.badmintonScoreBoard.player1.points,
                    "losepoints": $scope.badmintonScoreBoard.player2.points
                });
                $scope.badmintonScoreBoard.player1.points = $scope.badmintonScoreBoard.player2.points = 0;
                $scope.badmintonScoreBoard.player1.setWins++;
                $scope.badmintonScoreBoard.setNumber += 1;
                $scope.updateBadminton();
            } else if ($scope.badmintonScoreBoard.player1.points < $scope.badmintonScoreBoard.player2.points) {
                $scope.badmintonScoreBoard.setHistory.push({
                    "setnumber": $scope.badmintonScoreBoard.setNumber,
                    "winner": $scope.badmintonScoreBoard.player2.name,
                    "loser": $scope.badmintonScoreBoard.player1.name,
                    "winpoints": $scope.badmintonScoreBoard.player2.points,
                    "losepoints": $scope.badmintonScoreBoard.player1.points
                });
                $scope.badmintonScoreBoard.player1.points = $scope.badmintonScoreBoard.player2.points = 0;
                $scope.badmintonScoreBoard.player2.setWins++;
                $scope.badmintonScoreBoard.setNumber += 1;
                $scope.updateBadminton();
            } else {
                alert("Both Scores Equal! Can't End Set Yet!");
            }
        };

        $scope.resetGameBadminton = function () {
            $scope.badmintonScoreBoard = defaultBadmintonScoreBoard;
            $scope.badmintonScoreBoard.isLive = false;
            $scope.updateBadminton();
        };

        /////////////////////////////////////////////////
        ////////// for basketball scoreboard /////////////
        /////////////////////////////////////////////////

        $scope.basketballScoreBoard = {
            "quarterNumber" : 1 ,
            "isBreak": false,
            "isLive": false,
            "team1": {
                "name": null,
                "scores": 0
            },
            "team2": {
                "name": null,
                "scores": 0
            },
            "commentary": [/*{ "time": "0000", "text": "Comments" }*/]
        };

        var defaultBasketballScoreBoard = $scope.basketballScoreBoard;

        $scope.updateBasketball = function () {
            socket.emit("update-basketball", $scope.basketballScoreBoard);
        };

        $scope.changeBasketballScore1 = function (i) {
            $scope.basketballScoreBoard.team1.scores += i;
            $scope.updateBasketball();
        };

        $scope.changeBasketballScore2 = function (i) {
            $scope.basketballScoreBoard.team2.scores += i;
            $scope.updateBasketball();
        };

        $scope.changeBasketballQuarter = function(i) {
            $scope.basketballScoreBoard.quarterNumber += i ;
            $scope.updateBasketball();
        }

        $scope.resetGameBasketball = function () {
            $scope.basketballScoreBoard = defaultBasketballScoreBoard;
            $scope.basketballScoreBoard.isLive = false;
            $scope.updateBasketball();
        };

        $scope.commentBasketball = function (text) {
            var d = new Date();
            $scope.basketballScoreBoard.commentary.push({
                "time": d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
                "text": text
            });
            $scope.updateBasketball();
        };

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

        socket.on("basketball-updated", function (data) {
            console.log("an update");
            $scope.$apply(function () {
                $scope.basketballScoreBoard = data;
            });
        });




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
                case "basketball":
                    socket.emit("join-basketball");
                    socket.on("joined-basketball", function (data) {
                        console.log(data);
                        $scope.$apply(function () {
                            $scope.basketballScoreBoard = data;
                        });
                    });
                    break;
                case "cricket":
                    socket.emit("join-cricket");
                    socket.on("joined-cricket", function (data) {
                        console.log(data);
                        $scope.$apply(function () {
                            $scope.cricketScoreBoard = data;
                        });
                    });
                    break;
                case "volleyball":
                    socket.emit("join-volleyball");
                    socket.on("joined-volleyball", function (data) {
                        console.log(data);
                        $scope.$apply(function () {
                            $scope.volleyballScoreBoard = data;
                        });
                    });
                    break;
            }
        }

    });

