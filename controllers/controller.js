import { Helper } from "../helper/helper.js";

class Controller {
  static async loadPublicKey(req, res) {
    const publicKey = await Helper.loadPublicKey();
    if (publicKey) res.status(200).send(publicKey);
    else res.status(500).send("Erro ao carregar chave publica");
  }
  static async loadPrivateKey(req, res) {
    const publicKey = await Helper.loadPrivateKey();
    if (publicKey) res.status(200).send(publicKey);
    else res.status(500).send("Erro ao carregar chave publica");
  }
}

export { Controller };
