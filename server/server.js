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

  socket.on("disconnect", () => {
    console.log("User was Disconnect");
  });
});

server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
