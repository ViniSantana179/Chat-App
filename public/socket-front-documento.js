import { updateTextEditor, alertAndRedirect } from "./js/documento.js";

const socket = io();

socket.on("sendMessageClients", (message) => {
  updateTextEditor(message);
});

socket.on("documentRemoved", (documentName) => {
  alertAndRedirect(documentName);
});

function selectDocument(documentName) {
  socket.emit("selectDocument", documentName, (text) => {
    updateTextEditor(text);
  });
}

function textEditorEmit(data) {
  console.log("MEUS DADOS", data);
  socket.emit("sendMessage", data);
}

function deleteDocument(documentName) {
  socket.emit("deleteDocument", documentName);
}

export { textEditorEmit, selectDocument, deleteDocument };
