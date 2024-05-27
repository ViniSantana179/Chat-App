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

textEditor.addEventListener("keyup", async () => {
  const encryptedMessage = await dataEncrypt(textEditor.value);
  textEditorEmit({
    message: encryptedMessage,
    documentName,
  });
});

async function updateTextEditor(message) {
  if (message.trim()) {
    const decryptedMessage = await decryptAssData(message);
    textEditor.value = decryptedMessage;
  }
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

async function dataEncrypt(data) {
  try {
    const response = await fetch("http://localhost:3000/loadPk");
    if (!response.ok) {
      console.log("ERRO");
      throw new Error("Erro ao carregar chave pública");
    }
    const publicKey = await response.text();
    const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);
    const encryptedData = publicKeyObj.encrypt(data, "RSA-OAEP", {
      md: forge.md.sha256.create(),
    });
    const encryptedHex = forge.util.bytesToHex(encryptedData);
    return encryptedHex;
  } catch (error) {
    console.error("Erro:", error);
    alert(error.message);
    return null;
  }
}

async function decryptAssData(encryptedHex) {
  try {
    // Carregando minha chave privada do servidor
    const response = await fetch("http://localhost:3000/loadPrK");
    if (!response.ok) {
      console.log("ERRO");
      throw new Error("Erro ao carregar chave privada");
    }
    const privateKeyPem = await response.text();

    const privateKeyObj = forge.pki.privateKeyFromPem(privateKeyPem);

    // Converter a representação hexadecimal de volta para bytes
    const encryptedBytes = forge.util.hexToBytes(encryptedHex);

    // Descriptografar os bytes usando a chave privada
    const decryptedBytes = privateKeyObj.decrypt(encryptedBytes, "RSA-OAEP", {
      md: forge.md.sha256.create(),
    });

    // Converter os bytes de volta para string
    const decryptedData = forge.util.decodeUtf8(decryptedBytes);

    return decryptedData;
  } catch (error) {
    console.error("Erro:", error);
    alert(error.message);
    return null;
  }
}

export { updateTextEditor, alertAndRedirect };
