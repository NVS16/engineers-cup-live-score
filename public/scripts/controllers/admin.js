'use strict';

/**
 * @ngdoc function
 * @name scoreApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the scoreApp
 */
angular.module('scoreApp')
    .controller('AdminCtrl', function ($scope, $location, loginservice) {

        if (!loginservice.isLoggedIn()) $location.path('/');
        else {
            $scope.selectedGame = "football";
            socket.emit("join-football");
            socket.on("joined-football", function (data) {
                console.log(data);
                $scope.$apply(function () {
                    $scope.footballScoreBoard = data;
                });
            });
        }

        var viewers = 0;
        
        var defaultfootballScoreBoard = {
            "viewers": 1,
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
            "matchWinner" : "not declared",
            "commentary": [/*{ "time": "0000", "text": "Comments" }*/]
        };

        /////////////////////////////////////////////////
        ////////// for football scoreboard /////////////
        /////////////////////////////////////////////////

        $scope.footballScoreBoard = {};

        $scope.footballScoreBoard.matchWinner = "not declared";

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
            $scope.footballScoreBoard.commentary.unshift({
                "time": d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
                "text": text
            });
            $scope.updateFootball();
        }

        $scope.finishFootball = function () {
            if ($scope.footballScoreBoard.team2.scores.length > $scope.footballScoreBoard.team1.scores.length)
                $scope.footballScoreBoard.matchWinner = "team2";
            else if ($scope.footballScoreBoard.team2.scores.length < $scope.footballScoreBoard.team1.scores.length)
                $scope.footballScoreBoard.matchWinner = "team1";
            else
                $scope.footballScoreBoard.matchWinner = "none";
            $scope.updateFootball();
        }

        $scope.delFootballComment = function (index) {
            $scope.footballScoreBoard.commentary.splice(index, 1);
            $scope.updateFootball();
        };


        $scope.resetGameFootball = function () {
            viewers = $scope.footballScoreBoard.viewers;
            $scope.footballScoreBoard = defaultfootballScoreBoard;
            $scope.footballScoreBoard.viewers = viewers;
            $scope.updateFootball();
        };

        ////////////////////////////////////////////////

        /////////////////////////////////////////////////
        ////////// for tennis scoreboard ////////////////
        /////////////////////////////////////////////////

        $scope.tennisScoreBoard = {
            "viewers": 1,
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
            "matchWinner": "not declared",
            "commentary": [/*{ "time": "00", "text": "Comments" }*/]
        };
        var defaultTennisScoreBoard = $scope.tennisScoreBoard;

        $scope.updateTennis = function () {
            socket.emit("update-tennis", $scope.tennisScoreBoard);
        }

        $scope.commentTennis = function (text) {
            var d = new Date();
            $scope.tennisScoreBoard.commentary.unshift({
                "time": d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
                "text": text
            });
            $scope.updateTennis();
        }

        $scope.delTennisComment = function (index) {
            $scope.tennisScoreBoard.commentary.splice(index, 1);
            $scope.updateTennis();
        };

        $scope.changeTennisScore1 = function (i) {
            $scope.tennisScoreBoard.player1.points += i;
            $scope.updateTennis();
        };

        $scope.changeTennisScore2 = function (i) {
            $scope.tennisScoreBoard.player2.points += i;
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
                    "winpoints": $scope.tennisScoreBoard.player2.points,
                    "loosepoints": $scope.tennisScoreBoard.player1.points
                });
                $scope.tennisScoreBoard.player1.points = $scope.tennisScoreBoard.player2.points = 0;
                $scope.tennisScoreBoard.player2.setWins += 1;
                $scope.tennisScoreBoard.setNumber += 1;
                $scope.updateTennis();
            } else {
                alert("Both Scores Equal! Can't End Set Yet!");
            }
        };

        $scope.finishTennis = function () {
            $scope.endSetTennis();
            if($scope.tennisScoreBoard.setNumber === 4) {
             
                if ($scope.tennisScoreBoard.player1.setWins > $scope.tennisScoreBoard.player2.setWins) {
                    $scope.tennisScoreBoard.matchWinner = "player1"
                } else if ($scope.tennisScoreBoard.player1.setWins < $scope.tennisScoreBoard.player2.setWins) {
                    $scope.tennisScoreBoard.matchWinner = "player2"
                } else {
                    $scope.tennisScoreBoard.matchWinner = "none"
                }
                $scope.tennisScoreBoard.setNumber = 3;
                $scope.updateTennis();
            }
        }

        $scope.resetGameTennis = function () {
            viewers = $scope.tennisScoreBoard.viewers;
            $scope.tennisScoreBoard = defaultTennisScoreBoard;
            $scope.tennisScoreBoard.viewers = viewers;
            $scope.updateTennis();
        };

        /////////////////////////////////////////////////
        ////////// for badminton scoreboard /////////////
        /////////////////////////////////////////////////

        $scope.badmintonScoreBoard = {
            "viewers": 1,
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
            "matchWinner": "not declared",
            "commentary": [/*{ "time": "00", "text": "Comments" }*/]
        };

        var defaultBadmintonScoreBoard = $scope.badmintonScoreBoard;

        $scope.updateBadminton = function () {
            socket.emit("update-badminton", $scope.badmintonScoreBoard);
        }

        $scope.commentBadminton = function (text) {
            var d = new Date();
            $scope.badmintonScoreBoard.commentary.unshift({
                "time": d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
                "text": text
            });
            $scope.updateBadminton();
        }

        $scope.delBadmintonComment = function (index) {
            $scope.badmintonScoreBoard.commentary.splice(index, 1);
            $scope.updateBadminton();
        };

        $scope.changeBadmintonScore1 = function (i) {
            $scope.badmintonScoreBoard.player1.points += i;
            $scope.updateBadminton();
        };

        $scope.changeBadmintonScore2 = function (i) {
            $scope.badmintonScoreBoard.player2.points += i;
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

        $scope.finishBadminton = function () {
            $scope.endSetBadminton();
            if($scope.badmintonScoreBoard.setNumber === 4) {
                $scope.badmintonScoreBoard.setNumber = 3;
                if ($scope.badmintonScoreBoard.player1.setWins > $scope.badmintonScoreBoard.player2.setWins) {
                    $scope.badmintonScoreBoard.matchWinner = "player1"
                } else if ($scope.badmintonScoreBoard.player1.setWins < $scope.badmintonScoreBoard.player2.setWins) {
                    $scope.badmintonScoreBoard.matchWinner = "player2"
                } else {
                    $scope.badmintonScoreBoard.matchWinner = "none"
                }

                $scope.updateBadminton();
            }
        }

        $scope.resetGameBadminton = function () {
            viewers = $scope.badmintonScoreBoard.viewers;
            $scope.badmintonScoreBoard = defaultBadmintonScoreBoard;
            $scope.badmintonScoreBoard.viewers = viewers;
            $scope.updateBadminton();
        };

        /////////////////////////////////////////////////
        ////////// for basketball scoreboard /////////////
        /////////////////////////////////////////////////

        $scope.basketballScoreBoard = {
            "viewers": 1,
            "quarterNumber": 1,
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
            "matchWinner": "not declared",
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

        $scope.changeBasketballQuarter = function (i) {
            $scope.basketballScoreBoard.quarterNumber += i;
            $scope.updateBasketball();
        }

        $scope.resetGameBasketball = function () {
            viewers = $scope.basketballScoreBoard.viewers;
            $scope.basketballScoreBoard = defaultBasketballScoreBoard;
            $scope.basketballScoreBoard.viewers = viewers;
            $scope.updateBasketball();
        };

        $scope.commentBasketball = function (text) {
            var d = new Date();
            $scope.basketballScoreBoard.commentary.unshift({
                "time": d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
                "text": text
            });
            $scope.updateBasketball();
        };

        $scope.finishBasketball = function () {
            if ($scope.basketballScoreBoard.team2.scores > $scope.basketballScoreBoard.team1.scores)
                $scope.basketballScoreBoard.matchWinner = "team2";
            else if ($scope.basketballScoreBoard.team2.scores < $scope.basketballScoreBoard.team1.scores)
                $scope.basketballScoreBoard.matchWinner = "team1";
            else
                $scope.basketballScoreBoard.matchWinner = "none";
            $scope.updateBasketball();
        }

        $scope.delBasketballComment = function (index) {
            $scope.basketballScoreBoard.commentary.splice(index, 1);
            $scope.updateBasketball();
        };
        /////////////////////////////////////////////////
        ////////// for volleyball scoreboard /////////////
        /////////////////////////////////////////////////

        $scope.volleyballScoreBoard = {
            "viewers": 0,
            "setNumber": 1,
            "isBreak": false,
            "isLive": false,
            "setHistory": [],
            "team1": {
              "name": null,
              "points": 0,
              "setWins": 0
            },
            "team2": {
              "name": null,
              "points": 0,
              "setWins": 0 
            },
            "matchWinner": "not declared",
            "commentary": [/*{ "time": "00", "text": "Comments" }*/]
        };

        var defaultVolleyballScoreBoard = $scope.volleyballScoreBoard;

        $scope.updateVolleyball = function () {
            socket.emit("update-volleyball", $scope.volleyballScoreBoard);
        }

        $scope.commentVolleyball = function (text) {
            var d = new Date();
            $scope.volleyballScoreBoard.commentary.unshift({
                "time": d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
                "text": text
            });
            $scope.updateVolleyball();
        }
        $scope.delVolleyballComment = function (index) {
            $scope.volleyballScoreBoard.commentary.splice(index, 1);
            $scope.updateVolleyball();
        };

        $scope.changeVolleyballScore1 = function (i) {
            $scope.volleyballScoreBoard.team1.points += i;
            $scope.updateVolleyball();
        };

        $scope.changeVolleyballScore2 = function (i) {
            $scope.volleyballScoreBoard.team2.points += i;
            $scope.updateVolleyball();
        };


        $scope.endSetVolleyball = function () {
            if ($scope.volleyballScoreBoard.team1.points > $scope.volleyballScoreBoard.team2.points) {
                $scope.volleyballScoreBoard.setHistory.push({
                    "setnumber": $scope.volleyballScoreBoard.setNumber,
                    "winner": $scope.volleyballScoreBoard.team1.name,
                    "loser": $scope.volleyballScoreBoard.team2.name,
                    "winpoints": $scope.volleyballScoreBoard.team1.points,
                    "losepoints": $scope.volleyballScoreBoard.team2.points
                });
                $scope.volleyballScoreBoard.team1.points = $scope.volleyballScoreBoard.team2.points = 0;
                $scope.volleyballScoreBoard.team1.setWins++;
                $scope.volleyballScoreBoard.setNumber += 1;
                $scope.updateVolleyball();
            } else if ($scope.volleyballScoreBoard.team1.points < $scope.volleyballScoreBoard.team2.points) {
                $scope.volleyballScoreBoard.setHistory.push({
                    "setnumber": $scope.volleyballScoreBoard.setNumber,
                    "winner": $scope.volleyballScoreBoard.team2.name,
                    "loser": $scope.volleyballScoreBoard.team1.name,
                    "winpoints": $scope.volleyballScoreBoard.team2.points,
                    "losepoints": $scope.volleyballScoreBoard.team1.points
                });
                $scope.volleyballScoreBoard.team1.points = $scope.volleyballScoreBoard.team2.points = 0;
                $scope.volleyballScoreBoard.team2.setWins++;
                $scope.volleyballScoreBoard.setNumber += 1;
                $scope.updateVolleyball();
            } else {
                alert("Both Scores Equal! Can't End Set Yet!");
            }
        };

        $scope.finishVolleyball = function () {
            $scope.endSetVolleyball();
            if($scope.volleyballScoreBoard.setNumber === 4) {
                $scope.volleyballScoreBoard.setNumber = 3;
                if ($scope.volleyballScoreBoard.team1.setWins > $scope.volleyballScoreBoard.team2.setWins) {
                    $scope.volleyballScoreBoard.matchWinner = "team1"
                } else if ($scope.volleyballScoreBoard.team1.setWins < $scope.volleyballScoreBoard.team2.setWins) {
                    $scope.volleyballScoreBoard.matchWinner = "team2"
                } else {
                    $scope.volleyballScoreBoard.matchWinner = "none"
                }

                $scope.updateVolleyball();
            }
        }

        $scope.resetGameVolleyball = function () {
            viewers = $scope.volleyballScoreBoard.viewers;
            $scope.volleyballScoreBoard = defaultVolleyballScoreBoard;
            $scope.volleyballScoreBoard.viewers = viewers;
            $scope.updateVolleyball();
        };
        /////////////////////////////////////////////////
        ////////// for cricket scoreboard /////////////
        /////////////////////////////////////////////////

        $scope.cricketScoreBoard = {
            "viewers": 0,
            "innings": 1,
            "isBreak": false,
            "isLive": false,
            "runs": 0,
            "wickets": 0,
            "totalOvers": 20,
            "currOver": 1,
            "toWin": 1,
            "innHistory": [],
            "batting": null,
            "balling": null,
            "matchWinner" : "not declared",
            "commentary": [/*{ "time": "00", "text": "Comments" }*/]
        };

        var defaultCricketScoreBoard = $scope.cricketScoreBoard;

        $scope.updateCricket = function () {
            socket.emit("update-cricket", $scope.cricketScoreBoard);
        }

        $scope.commentCricket = function (text) {
            var d = new Date();
            $scope.cricketScoreBoard.commentary.unshift({
                "time": d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
                "text": text
            });
            $scope.updateCricket();
        }
        $scope.delCricketComment = function(index) {
            $scope.cricketScoreBoard.commentary.splice(index, 1);
            $scope.updateCricket();
        };

        $scope.changeCricketTotalOvers = function (i) {
            $scope.cricketScoreBoard.totalOvers += i;
            $scope.updateCricket();
        };

        $scope.changeCricketCurrOver = function (i) {
            $scope.cricketScoreBoard.currOver += i;
            $scope.updateCricket();
        };

        $scope.changeCricketRuns = function (i) {
            $scope.cricketScoreBoard.runs += i;
            $scope.updateCricket();
        };

        $scope.changeCricketWickets = function (i) {
            $scope.cricketScoreBoard.wickets += i;
            $scope.updateCricket();
        };


        $scope.endInnCricket = function () {
            if ($scope.cricketScoreBoard.currOver === $scope.cricketScoreBoard.totalOvers || $scope.cricketScoreBoard.wickets === 10 || ($scope.cricketScoreBoard.innings === 2 && $scope.cricketScoreBoard.runs >= $scope.cricketScoreBoard.toWin)) {
                $scope.cricketScoreBoard.innHistory.push({
                    "batting": $scope.cricketScoreBoard.batting,
                    "balling": $scope.cricketScoreBoard.balling,
                    "runs": $scope.cricketScoreBoard.runs,
                    "wickets": $scope.cricketScoreBoard.wickets,
                    "totalOvers": $scope.cricketScoreBoard.totalOvers,
                    "currOver": $scope.cricketScoreBoard.currOver
                });
                if($scope.cricketScoreBoard.innings === 1) {
                    var temp = $scope.cricketScoreBoard.batting;
                    $scope.cricketScoreBoard.batting = $scope.cricketScoreBoard.balling;
                    $scope.cricketScoreBoard.balling = temp;
                    $scope.cricketScoreBoard.toWin = $scope.cricketScoreBoard.runs + 1;
                    $scope.cricketScoreBoard.currOver = 1;
                    $scope.cricketScoreBoard.wickets = 0;
                    $scope.cricketScoreBoard.runs = 0;
                }
                $scope.cricketScoreBoard.innings++;
                $scope.updateCricket();
            } else {
                alert("Either Overs Not Complete or Some Wickets Left!");
            }
        };

        $scope.finishCricket = function () {
            $scope.endInnCricket();
            if($scope.cricketScoreBoard.innings === 3) {
                $scope.cricketScoreBoard.innings = 2;
                if ($scope.cricketScoreBoard.innHistory[1].runs > $scope.cricketScoreBoard.innHistory[0].runs) {
                    $scope.cricketScoreBoard.matchWinner = "batting"
                } else if ($scope.cricketScoreBoard.innHistory[1].runs < $scope.cricketScoreBoard.innHistory[0].runs) {
                    $scope.cricketScoreBoard.matchWinner = "balling"
                } else {
                    $scope.cricketScoreBoard.matchWinner = "none"
                }

                $scope.updateCricket();
            }
        }

        $scope.resetGameCricket = function () {
            viewers = $scope.cricketScoreBoard.viewers;
            $scope.cricketScoreBoard = defaultCricketScoreBoard;
            $scope.cricketScoreBoard.viewers = viewers;
            $scope.updateCricket();
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

        socket.on("volleyball-updated", function (data) {
            console.log("an update");
            $scope.$apply(function () {
                $scope.volleyballScoreBoard = data;
            });
        });

        socket.on("cricket-updated", function (data) {
            console.log("an update");
            $scope.$apply(function () {
                $scope.cricketScoreBoard = data;
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

