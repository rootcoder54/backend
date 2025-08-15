/*
const auth = require('../middleware/auth');

*/

import { Router } from "express";

import authMiddleware from "../middleware/auth";
import {
  createClient,
  deleteClient,
  getAllClients,
  getClientById,
  updateClient
} from "../services/client.service";

//router.use(auth);
const clientRouter = Router();
clientRouter.use(authMiddleware);

clientRouter.get("/", async (req, res) => {
  const clients = await getAllClients();
  console.log(clients);
  res.json(clients);
});

clientRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const client = await getClientById(id);
  console.log(client);
  res.json(client);
});

clientRouter.post("/", async (req, res) => {
  const { nom, email, telephone, adresse, shopId } = req.body;
  const client = await createClient(nom, email, telephone, adresse, shopId);
  console.log(client);
  res.json(client);
});

clientRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nom, email, telephone, adresse, shopId } = req.body;
  const shop = await updateClient(id, nom, email, telephone, adresse, shopId);
  console.log(shop);
  res.json(shop);
});

clientRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const client = await deleteClient(id);
  console.log(client);
  res.json({ message: "Shop supprimé", client });
});

export default clientRouter;
