/*
const auth = require('../middleware/auth');

*/

import { Router } from "express";

import authMiddleware from "../middleware/auth";
import {
  addCategorie,
  deleteCategorie,
  getCategorieById,
  getCategories,
  updateCategorie
} from "../services/categorie.service";

//router.use(auth);
const categorieRouter = Router();
categorieRouter.use(authMiddleware);

categorieRouter.get("/", async (req, res) => {
  const categories = await getCategories();
  console.log(categories);
  res.json(categories);
});

categorieRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const categorie = await getCategorieById(id);
  console.log(categorie);
  res.json(categorie);
});

categorieRouter.post("/", async (req, res) => {
  const { nom, description, image, shopId } = req.body;
  const categorie = await addCategorie(nom, description, image, shopId);
  console.log(categorie);
  res.json(categorie);
});

categorieRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nom, description, image, shopId } = req.body;
  const categorie = await updateCategorie(id, nom, description, image, shopId);
  console.log(categorie);
  res.json(categorie);
});

categorieRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const categorie = await deleteCategorie(id);
  console.log(categorie);
  res.json({ message: "Categorie supprimé", categorie });
});

export default categorieRouter;
