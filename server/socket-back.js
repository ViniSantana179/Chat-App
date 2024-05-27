import {
  findDocument,
  updateDocument,
  getDocuments,
  newDocument,
  deleteDocument,
} from "./documentsDb.js";
import io from "./server.js";

io.on("connection", (socket) => {
  console.log("Id", socket.id);

  socket.on("selectDocument", async (documentName, callback) => {
    // Entrando em uma sala
    socket.join(documentName);
    const document = await findDocument(documentName);
    if (document) {
      // Reconhecimento do socket io
      callback(document.text);
    }
  });

  socket.on("sendMessage", async ({ message, documentName }) => {
    const update = await updateDocument(documentName, message);
    if (update.modifiedCount) {
      // Emitindo para salas especificas
      socket.to(documentName).emit("sendMessageClients", message);
    }
  });

  socket.on("getDocuments", async (callbackDocuments) => {
    console.log("Clientes solicita documentos");
    const documentList = await getDocuments();
    callbackDocuments(documentList);
  });

  socket.on("newDocument", async (documentName) => {
    const documentExists = await findDocument(documentName);
    if (!documentExists) {
      const result = await newDocument(documentName);
      if (result.acknowledged) {
        io.emit("addingNewDocument", documentName);
      }
    } else {
      socket.emit("documentExists", documentName);
    }
  });

  socket.on("deleteDocument", async (documentName) => {
    const result = await deleteDocument(documentName);

    if (result.deletedCount) {
      io.emit("documentRemoved", documentName);
    }

    console.log("Deletado", result);
  });
});
