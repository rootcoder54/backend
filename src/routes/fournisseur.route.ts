/*
const auth = require('../middleware/auth');

*/

import { Router } from "express";

import authMiddleware from "../middleware/auth";
import {
  createFournisseur,
  deleteFournisseur,
  getFournisseurById,
  getFournisseurs,
  updateFournisseur
} from "../services/fournisseur.service";

//router.use(auth);
const fournisseurRouter = Router();
fournisseurRouter.use(authMiddleware);

fournisseurRouter.get("/", async (req, res) => {
  const fournisseurs = await getFournisseurs();
  console.log(fournisseurs);
  res.json(fournisseurs);
});

fournisseurRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const fournisseur = await getFournisseurById(id);
  console.log(fournisseur);
  res.json(fournisseur);
});

fournisseurRouter.post("/", async (req, res) => {
  const { nom, email, telephone, adresse, shopId } = req.body;
  const fournisseur = await createFournisseur(
    nom,
    email,
    telephone,
    adresse,
    shopId
  );
  console.log(fournisseur);
  res.json(fournisseur);
});

fournisseurRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nom, email, telephone, adresse, shopId } = req.body;
  const fournisseur = await updateFournisseur(
    id,
    nom,
    email,
    telephone,
    adresse,
    shopId
  );
  console.log(fournisseur);
  res.json(fournisseur);
});

fournisseurRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const fournisseur = await deleteFournisseur(id);
  console.log(fournisseur);
  res.json({ message: "Fournisseur supprimé", fournisseur });
});

export default fournisseurRouter;
