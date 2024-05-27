import express from "express";
import { Controller } from "../controllers/controller.js";
const router = express.Router();

router.get("/loadPK", Controller.loadPublicKey);
router.get("/loadPrK", Controller.loadPrivateKey);

export { router };
