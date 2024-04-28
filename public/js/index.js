import { newDocument } from "./socket-front-index.js";

const documentList = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const inputDocument = document.getElementById("input-documento");

function insertDocument(documentName) {
  documentList.innerHTML += `

        <a
          href="documento.html?nome=${documentName}"
          class="list-group-item list-group-item-action"
          id="documento-${documentName}"
        >
          ${documentName}
        </a>  
    
    `;
}

function removeDocument(name) {
  const documentChild = document.getElementById(`documento-${name}`);
  documentList.removeChild(documentChild);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  newDocument(inputDocument.value);
  inputDocument.value = "";
});

export { insertDocument, removeDocument };
