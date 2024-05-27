import { documents } from "./dbConnect.js";

function findDocument(name) {
  const document = documents.findOne({ name });
  return document;
}

function updateDocument(documentName, text) {
  const update = documents.updateOne(
    { name: documentName },
    { $set: { text } }
  );
  return update;
}

function getDocuments() {
  const documentList = documents.find().toArray();
  return documentList;
}

function newDocument(name) {
  const result = documents.insertOne({
    name,
    text: "",
  });
  return result;
}

function deleteDocument(name) {
  const result = documents.deleteOne({ name });
  return result;
}

export {
  findDocument,
  updateDocument,
  getDocuments,
  newDocument,
  deleteDocument,
};
