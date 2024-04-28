let socket = io();

socket.on("connect", function () {
  console.log("Conected to server");

  socket.emit("createMessage", {
    from: "Vinicius",
    text: "Hello Socket Events",
  });
});

socket.on("disconnect", function () {
  console.log("Disconected to server");
});

socket.on("newMessage", function (message) {
  console.log("new Message", message);
});
