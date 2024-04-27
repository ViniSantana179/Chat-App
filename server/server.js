const path = require("path");
const express = require("express");

// Server App
const app = express();
const port = process.env.PORT || 3000;

// Public dirname
const publicDirname = path.join(__dirname, "../public");

app.use(express.static(publicDirname));

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
