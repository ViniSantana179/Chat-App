const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

// Public dirname
const publicDirname = path.join(__dirname, "../public");

const port = process.env.PORT || 3000;
const app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicDirname));

io.on("connection", (socket) => {
  console.log("A new user just connected");

  socket.emit("newMessage", {
    from: "Admin",
    text: "Welcome to the chat app",
    createdAt: new Date().getTime(),
  });

  socket.broadcast.emit("newMessage", {
    from: "Admin",
    text: "New User Join",
    createdAt: new Date().getTime(),
  });

  socket.on("createMessage", (message) => {
    console.log("created message", message);
    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime(),
    });
  });

  socket.on("disconnect", () => {
    console.log("User was Disconnect");
  });
});

server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
