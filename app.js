var express = require("express");
var app = express();
var http = require("http").Server(app);
var bodyParser = require("body-parser");
var io = require("socket.io")(http);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

var football_score = {
  "viewers": 0,
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

var table_tennis = {
  "viewers": 0,
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
  "matchWinner" : "not declared",
  "commentary": [/*{ "time": "00", "text": "Comments" }*/]
};

var badminton = {
  "viewers": 0,
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
  "matchWinner" : "not declared",
  "commentary": [/*{ "time": "00", "text": "Comments" }*/]
};

var basketball = {
  "viewers": 0,
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
  "matchWinner" : "not declared",
  "commentary": [/*{ "time": "0000", "text": "Comments" }*/]
};

var volleyBall = {
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
  "matchWinner" : "not declared",
  "commentary": [/*{ "time": "00", "text": "Comments" }*/]
};

var cricket = {
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

io.on("connection", function (socket) {
  console.log("User connected with socket id : " + socket.id);

  //////////////////////////////////////////////////////////////////////
  /////////////////// for football /////////////////////////////////////
  //////////////////////////////////////////////////////////////////////

  socket.on("join-football", function () {
    if(socket.roomName) {
      socket.leave(socket.roomName);
      updateOnGroupLeave(socket.roomName);
    }
    socket._rooms = [];
    socket.join("football"); // the football room
    socket.roomName = "football";
    if(io.sockets.adapter.rooms['football']) football_score.viewers = io.sockets.adapter.rooms['football'].length;
    socket.emit("joined-football", football_score);
    io.in("football").emit("football-updated", football_score);
  });

  socket.on("update-football", function (data) {
    football_score = data;
    console.log(data);
    io.in("football").emit("football-updated", football_score);
  });

  ///////////////////////////////////////////////////////////////////////
  ///////////////////// for tennis //////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  socket.on("join-tennis", function () {
    if(socket.roomName) {
      socket.leave(socket.roomName);
      updateOnGroupLeave(socket.roomName);
    }
    socket._rooms = [];
    socket.join("tennis"); // the badminton room
    socket.roomName = "tennis";
    if(io.sockets.adapter.rooms['tennis']) table_tennis.viewers = io.sockets.adapter.rooms["tennis"].length;
    socket.emit("joined-tennis", table_tennis);
    io.in("tennis").emit("tennis-updated", table_tennis);
  });

  socket.on("update-tennis", function (data) {
    table_tennis = data;
    console.log(data);
    io.in("tennis").emit("tennis-updated", table_tennis);
  });

  ///////////////////////////////////////////////////////////////////////
  ///////////////////// for badminton //////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  socket.on("join-badminton", function () {
    if(socket.roomName) {
      socket.leave(socket.roomName);
      updateOnGroupLeave(socket.roomName);
    }
    socket._rooms = [];
    socket.join("badminton"); // the badminton room
    socket.roomName = "badminton";
    if(io.sockets.adapter.rooms['badminton']) badminton.viewers = io.sockets.adapter.rooms['badminton'].length;
    socket.emit("joined-badminton", badminton);
    io.in("badminton").emit("badminton-updated", badminton);
  });

  socket.on("update-badminton", function (data) {
    badminton = data;
    console.log(data);
    io.in("badminton").emit("badminton-updated", badminton);
  });

  ///////////////////////////////////////////////////////////////////////
  ///////////////////// for basketball //////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  socket.on("join-basketball", function () {
    if(socket.roomName) {
      socket.leave(socket.roomName);
      updateOnGroupLeave(socket.roomName);
    }
    socket._rooms = [];
    socket.join("basketball"); // the basketball room
    socket.roomName = "basketball";
    if(io.sockets.adapter.rooms['basketball']) basketball.viewers = io.sockets.adapter.rooms['basketball'].length;
    socket.emit("joined-basketball", basketball);
    io.in("basketball").emit("basketball-updated", basketball);
  });

  socket.on("update-basketball", function (data) {
    basketball = data;
    console.log(data);
    io.in("basketball").emit("basketball-updated", basketball);
  });


  socket.on("disconnect", function () {
    console.log("user disconnected");
    console.log("room name - " + socket.roomName);
    //console.log("no. of users - " + io.sockets.adapter.rooms[socket.roomName].length);
    if(socket.roomName) updateOnGroupLeave(socket.roomName);
  });


  ///////////////////////////////////////////////////////
  ///////////for volleyBall/////////////////////////////
  ///////////////////////////////////////////////////////

  socket.on("join-volleyball", function () {
    if(socket.roomName) {
      socket.leave(socket.roomName);
      updateOnGroupLeave(socket.roomName);
    }
    socket._rooms = [];
    socket.join("volleyball"); // the badminton room
    socket.roomName = "volleyball";
    console.log("Current Volley lenght", io.sockets.adapter.rooms["volleyball"].length);
    if(io.sockets.adapter.rooms['volleyball']) volleyBall.viewers = io.sockets.adapter.rooms["volleyball"].length;
    console.log("Actual Scoreboard : ", volleyBall.viewers);
    socket.emit("joined-volleyball", volleyBall);
    io.in("volleyball").emit("volleyball-updated", volleyBall);
  });

  socket.on("update-volleyball", function (data) {
    volleyBall = data;
    console.log(data);
    io.in("volleyball").emit("volleyball-updated", volleyBall);
  });

  ///////////////////////////////////////////////////////
  ///////////for cricket/////////////////////////////
  ///////////////////////////////////////////////////////

  socket.on("join-cricket", function () {
    if(socket.roomName) {
      socket.leave(socket.roomName);
      updateOnGroupLeave(socket.roomName);
    }
    socket._rooms = [];
    socket.join("cricket"); // the badminton room
    socket.roomName = "cricket";
    if(io.sockets.adapter.rooms['cricket']) cricket.viewers = io.sockets.adapter.rooms["cricket"].length;
    socket.emit("joined-cricket", cricket);
    io.in("cricket").emit("cricket-updated", cricket);
  });

  socket.on("update-cricket", function (data) {
    cricket = data;
    console.log(data);
    io.in("cricket").emit("cricket-updated", cricket);
  });
});






app.use(express.static(__dirname + "/public"));
var port = (process.env.PORT || '3000');
app.set('port', port);
http.listen(port, function () {
  console.log("listening on : 3000");
});




//////////////////////////////////////////////////////
////// function to quit from existing room ///////////
//////////////////////////////////////////////////////

function updateOnGroupLeave(roomname) {
  if (roomname) {
    switch (roomname) {
      case "football": if (io.sockets.adapter.rooms['football']) {
        football_score.viewers = io.sockets.adapter.rooms['football'].length;
        io.in("football").emit("football-updated", football_score);
      }
        break;
      case "tennis": if (io.sockets.adapter.rooms["tennis"]) {
        table_tennis.viewers = io.sockets.adapter.rooms["tennis"].length;
        io.in("tennis").emit("tennis-updated", table_tennis);
      }
        break;
      case "badminton": if (io.sockets.adapter.rooms["badminton"]) {
        badminton.viewers = io.sockets.adapter.rooms["badminton"].length;
        io.in("badminton").emit("badminton-updated", badminton);
      }
        break;
      case "basketball": if (io.sockets.adapter.rooms["basketball"]) {
        basketball.viewers = io.sockets.adapter.rooms["basketball"].length;
        io.in("basketball").emit("basketball-updated", basketball);
      }
        break;
      case "volleyball": if (io.sockets.adapter.rooms["volleyball"]) {
        volleyBall.viewers = io.sockets.adapter.rooms["volleyball"].length;
        io.in("volleyball").emit("volleyball-updated", volleyBall);
      }
       break;
       case "cricket": if (io.sockets.adapter.rooms["cricket"]) {
        volleyBall.viewers = io.sockets.adapter.rooms["cricket"].length;
        io.in("cricket").emit("cricket-updated", cricket);
      }
    }
  }
}
