import path from "path";
import url from "url";
import http from "http";
import express from "express";
import { Server } from "socket.io";
import "./dbConnect.js";
import { Helper } from "../helper/helper.js";
import { router } from "../routes/routes.js";

// Public dirname
const publicPath = url.fileURLToPath(import.meta.url);
const publicDirname = path.join(publicPath, "../../public");

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(publicDirname));
app.use("/", router);

server.listen(port, () => {
  Helper.generateRSAKeys();
  console.log(`Server is running at ${port}`);
});

export default io;
