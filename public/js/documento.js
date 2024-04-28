import {
  textEditorEmit,
  selectDocument,
  deleteDocument,
} from "../socket-front-documento.js";

// Resgatando meus parametros da url
const params = new URLSearchParams(window.location.search);
const documentName = params.get("nome"); // Pegando o param nome

// Dom para adicionar um novo documento
const textEditor = document.getElementById("editor-texto");
const documentTitle = document.getElementById("titulo-documento");
documentTitle.textContent = documentName || "Documento sem Titulo";

// Dom para remover um documento
const btnDeleteDocument = document.getElementById("excluir-documento");

selectDocument(documentName);

textEditor.addEventListener("keyup", () => {
  textEditorEmit({
    message: textEditor.value,
    documentName,
  });
});

function updateTextEditor(message) {
  textEditor.value = message;
}

function alertAndRedirect(name) {
  console.log(documentTitle.textContent);
  if (name === documentTitle.textContent) {
    alert(`Documento ${name} excluido!`);
    window.location.href = "/";
  }
}

btnDeleteDocument.addEventListener("click", () => {
  deleteDocument(documentTitle.textContent);
});

export { updateTextEditor, alertAndRedirect };
