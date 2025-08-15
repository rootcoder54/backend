/*
const auth = require('../middleware/auth');

*/

import { Router } from "express";

import authMiddleware from "../middleware/auth";
import {
  addProduit,
  deleteProduit,
  getProduitById,
  getProduits,
  updateProduit
} from "../services/produit.service";

//router.use(auth);
const produitRouter = Router();
produitRouter.use(authMiddleware);

produitRouter.get("/", async (req, res) => {
  const produits = await getProduits();
  console.log(produits);
  res.json(produits);
});

produitRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const produit = await getProduitById(id);
  console.log(produit);
  res.json(produit);
});

produitRouter.post("/", async (req, res) => {
  const {
    nom,
    description,
    prix,
    quantite,
    categorieId,
    fournisseurId,
    shopId
  } = req.body;
  const prixre = parseFloat(prix);
  const qte = parseInt(quantite, 10);
  if (isNaN(prixre) || isNaN(qte)) {
    return res.status(400).json({ error: "Prix ou quantité invalide" });
  }
  const produit = await addProduit(
    nom,
    description,
    prixre,
    qte,
    categorieId,
    fournisseurId,
    shopId
  );
  console.log(produit);
  res.json(produit);
});

produitRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    nom,
    description,
    prix,
    quantite,
    categorieId,
    fournisseurId,
    shopId
  } = req.body;
  const prixre = parseFloat(prix);
  const qte = parseInt(quantite, 10);
  if (isNaN(prixre) || isNaN(qte)) {
    return res.status(400).json({ error: "Prix ou quantité invalide" });
  }
  const produit = await updateProduit(
    id,
    nom,
    description,
    prixre,
    qte,
    categorieId,
    fournisseurId,
    shopId
  );
  console.log(produit);
  res.json(produit);
});

produitRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const produit = await deleteProduit(id);
  console.log(produit);
  res.json({ message: "Produit supprimé", produit });
});

export default produitRouter;
