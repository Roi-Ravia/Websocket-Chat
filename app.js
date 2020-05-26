const express = require("express");
var socket = require("socket.io");
const app = express();

const server = app.listen(4000, function () {
  console.log("Server has started running on port 4000");
});
app.use(express.static(__dirname + "/public"));

//Setup socket
const io = socket(server);

io.on("connection", function (socket) {
  console.log("made socket connection", socket.id);
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
