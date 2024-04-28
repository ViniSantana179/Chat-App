import { MongoClient } from "mongodb";

const client = new MongoClient(
  "mongodb+srv://viniciussantana2525:B0sXyUVBsV7A6gWG@cluster0.n48o57c.mongodb.net/"
);

let documents;

try {
  await client.connect();

  const db = client.db("alura-documents-websockets");
  documents = db.collection("documents");

  console.log("Conectado ao Banco de dados com sucesso");
} catch (error) {
  console.log(error);
}

export { documents };
