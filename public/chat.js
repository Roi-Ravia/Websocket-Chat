var socket = io.connect("http://localhost:4000");

//get hold of elements with DOM
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
  //reset after send
  message.value = "";
  btn.setAttribute("disabled", "true");
});

function isEmpty(string) {
  if (string.trim() === "") {
    return true;
  } else {
    return false;
  }
}
//intial input disabling

isEmpty(message.value) &&
  isEmpty(handle.value) &&
  btn.setAttribute("disabled", "true");

//When typing
message.addEventListener("keyup", () => {
  socket.emit("typing", handle.value);

  !isEmpty(message.value) && !isEmpty(handle.value)
    ? btn.removeAttribute("disabled")
    : btn.setAttribute("disabled", "true");
});

//When server returns answer, catch it and show it
//Chat
socket.on("chat", (data) => {
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
  feedback.innerHTML = "";
  message.innerHTML = "";
});

//Typing
socket.on("typing", (data) => {
  feedback.innerHTML = "<p><em>" + data + " is typing...</em></p>";
});
