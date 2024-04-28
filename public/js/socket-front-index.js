import { insertDocument, removeDocument } from "./index.js";
const socket = io();

socket.emit("getDocuments", (callbackDocuments) => {
  callbackDocuments.forEach((document) => {
    insertDocument(document.name);
  });
});

socket.on("addingNewDocument", (name) => {
  insertDocument(name);
});

socket.on("documentExists", (documentName) => {
  alert(`O documento ${documentName} ja existe.`);
});

socket.on("documentRemoved", (documentName) => {
  console.log(documentName);
  removeDocument(documentName);
});

function newDocument(documentName) {
  socket.emit("newDocument", documentName);
}

export { newDocument };
