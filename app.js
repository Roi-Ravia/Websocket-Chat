const express = require("express");
var socket = require("socket.io");
const app = express();

const server = app.listen(process.env.PORT, function () {
  console.log("Server is running at port 4000");
});
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

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
