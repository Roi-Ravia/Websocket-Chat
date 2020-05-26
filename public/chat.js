var socket = io.connect("http://localhost:4000/");

let message = document.getElementById("message");
let handle = document.getElementById("handle");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let feedback = document.getElementById("feedback");
//when clicked, send/emit inputted data to the server through the socket
btn.addEventListener("click", () => {
  socket.emit("chat", {
    handle: handle.value,
    message: message.value,
  });
});

message.addEventListener("keydown", (data) => {
  socket.emit("typing", handle.value);
});
//When server returns answer, catch it and show it
//Chat
socket.on("chat", (data) => {
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
  feedback.innerHTML = "";
});

//Typing
socket.on("typing", (data) => {
  feedback.innerHTML = "<p><em>" + data + " is typing...</em></p>";
});
