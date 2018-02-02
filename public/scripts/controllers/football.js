'use strict';

angular.module('scoreApp')
  .controller('FootballCtrl', function ($scope) {

    socket.emit('join-football', $scope.details );
    $scope.scoreBoard = {
      "isHalfTime": false,
      "isLive": false ,
      "team1": {
        "name": null,
        "scores": [{ "time": 0, "scorer": null }]
      },
      "team2": {
        "name": null,
        "scores": [{ "time": 0, "scorer": null }]
      },
      "commentry": [{ "time": "0000", "text": "Comments" }]
    }; 

    socket.on("joined-football" , function(data){
      console.log(data);
      $scope.$apply(function(){
        $scope.scoreBoard = data ;
      });
    });

    socket.on("football-updated" , function(data){
      console.log("an update - " + data.toString());
      $scope.$apply(function(){
        $scope.scoreBoard = data ;
      });
  })

  });