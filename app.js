var express = require("express");
var app = express();
var http = require("http").Server(app);
var bodyParser = require("body-parser");
var io = require("socket.io")(http);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

var football_score = {
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

var table_tennis = {
  "setNumber": 1,
  "isHalfTime": false,
  "isLive": false,
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

var badminton = {
  "setNumber": 1,
  "isHalfTime": false,
  "isLive": false,
  "player1": {
    "name": null,
    "points": 0,
    "setWins": 0
  },
  "player2": {
    "name": null,
    "points": 0,
    "setWins": 0
  },
  "commentary": [/*{ "time": "00", "text": "Comments" }*/]
};

var basketball = {
  "isHalfTime": false,
  "isLive": false,
  "team1": {
    "name": null,
    "scores": 0
  },
  "team2": {
    "name": null,
    "scores": 0
  },
  "commentary": [{ "time": "0000", "text": "Comments" }]
};

var volleyBall = {
  "setNumber": 0,
  "isHalfTime": false,
  "isLive": false,
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
  "commentary": [{ "time": "00", "text": "Comments" }]
};

var cricket = {
  "innings": 0,
  "isBreak": false,
  "isLive": false,
  "team1": {
    "name": null,
    "score": 0,
    "isBatting": false
  },
  "team2": {
    "name": null,
    "isBatting": false
  },
  "commentary": [{ "time": "00", "text": "Comments" }]
};

io.on("connection", function (socket) {
  console.log("User connected with socket id : " + socket.id);

  //////////////////////////////////////////////////////////////////////
  /////////////////// for football /////////////////////////////////////
  //////////////////////////////////////////////////////////////////////

  socket.on("join-football", function () {
    socket._rooms = [];
    socket.join("football"); // the football room 
    socket.emit("joined-football", football_score);
  });

  socket.on("update-football", function (data) {
    football_score = data;
    console.log(data);
    io.emit("football-updated", football_score); 
  });

  ///////////////////////////////////////////////////////////////////////
  ///////////////////// for tennis //////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  socket.on("join-tennis", function () {
    socket._rooms = [];
    socket.join("tennis"); // the badminton room 
    socket.emit("joined-tennis", table_tennis);
  });

  socket.on("update-tennis", function (data) {
    table_tennis = data;
    console.log(data);
    io.emit("tennis-updated", table_tennis);
  });

  ///////////////////////////////////////////////////////////////////////
  ///////////////////// for badminton //////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  socket.on("join-badminton", function () {
    socket._rooms = [];
    socket.join("badminton"); // the badminton room 
    socket.emit("joined-badminton", badminton);
  });

  socket.on("update-badminton", function (data) {
    badminton = data;
    console.log(data);
    io.emit("badminton-updated", badminton);
  });


  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

app.use(express.static(__dirname + "/public"));

http.listen(3000, function () {
  console.log("listening on : 3000");
});
